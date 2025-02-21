import jwt from "jsonwebtoken"
const isAuthenticated=async(req,res,next)=>
{
    try {
        // console.log("Cookies:", req.cookies);
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json({
                message:"Not authenticated"
            })
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decode)
        {
            return res.status(401).json({
                message:"Invalid token"
            })
        };
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;