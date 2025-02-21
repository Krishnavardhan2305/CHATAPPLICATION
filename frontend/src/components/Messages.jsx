import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages()
   useGetRealTimeMessage()
 
  const { messages } = useSelector(store => store.message) || { messages: [] };

  if (!messages) return ; 

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      ) : (
        <p className="text-center text-gray-500">No messages available.</p>
      )}
    </div>
  );
};

export default Messages;
