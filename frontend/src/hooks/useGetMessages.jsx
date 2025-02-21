import React, { useEffect } from 'react'
import { MESSAGE_API_ENDPOINT } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${MESSAGE_API_ENDPOINT}/${selectedUser?._id}`);
                console.log(res.data);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        fetchMessages(); 
    }, [selectedUser, dispatch]); 
};

export default useGetMessages;
