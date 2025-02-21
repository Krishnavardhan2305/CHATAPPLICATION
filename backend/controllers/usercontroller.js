import User from "../models/userModel.js"; // Now correctly importing
import bcrypt from "bcryptjs"; // Fixed typo
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
       // console.log(fullName, username, password, confirmPassword, gender)
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        // JWT
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        // Set cookie
        res.cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: "strict" 
        });

        // console.log("Response Headers:", res.getHeaders());

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: " Logged out succesfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // console.log(otherUsers);
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}
