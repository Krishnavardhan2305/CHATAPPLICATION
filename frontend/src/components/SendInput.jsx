import React, {  useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const {messages}=useSelector(store=>store.message);
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return; 
    if (!selectedUser?._id) {
      return;
    }

    try {
      console.log(message);
      const res = await axios.post(
        `${MESSAGE_API_ENDPOINT}/send/${selectedUser._id}`,
        { message },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // console.log(res.data);
      dispatch(setMessages([...messages,res.data.newMessage]))
      setMessage(""); 
    } catch (error) {
      console.error(error);
    
    }
  };

  return (
    <form className='px-4 my-3' onSubmit={onSubmitHandler}>
      <div className='w-full relative'>
        <input
          type="text"
          placeholder='Send a message...'
          value={message}
          onChange={messageHandler}
          className='border text-sm rounded-lg block w-full bg-gray-600 text-white p-3 border-zinc-500'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
