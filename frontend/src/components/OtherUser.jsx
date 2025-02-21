import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(user._id) ?? false; // ✅ Safe check added

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${
                    selectedUser?._id === user?._id ? "bg-zinc-200" : ""
                } flex gap-3 items-center hover:bg-zinc-200 rounded-md p-3 cursor-pointer transition-all duration-200`}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                        <img src={user?.profilePhoto} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-black font-semibold text-sm">{user?.fullName}</p>
                </div>
            </div>

            <div className="border-b border-gray-300"></div>
        </>
    );
};

export default OtherUser;
