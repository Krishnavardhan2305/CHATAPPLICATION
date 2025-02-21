import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null)); 
  // }, []); 

  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[550px] flex flex-col">
          {/* Header */}
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-2 py-2 mb-2">
            <div className="">
              <div className="w-12 rounded-full">
                <img 
                  src={selectedUser?.profilePhoto || "https://via.placeholder.com/150"} 
                  alt="User Profile" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{selectedUser?.fullName}</p>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <h1 className="flex justify-center items-center font-extrabold text-black m-3 p-2">
          Hello! Start a conversation with your friends.
        </h1>
      )}
    </>
  );
};

export default MessageContainer;
