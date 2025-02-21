import React, { useEffect } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import {useDispatch} from "react-redux"
import { setOtherUsers } from '../redux/userSlice'

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers
