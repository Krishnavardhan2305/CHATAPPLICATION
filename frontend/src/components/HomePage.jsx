import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { USER_API_ENDPOINT } from '../utils/constant'
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const HomePage = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler=async()=>
  {
    try {
      const res=await axios.get(`${USER_API_ENDPOINT}/logout`);
      navigate("/login");
      toast.success("Logout Succesfull");
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-op'>
      <Sidebar/>
      <MessageContainer/>
      <div>
        <button onClick={logoutHandler} className='btn btn-sm p-2 m-2 rounded-md'>LogOut</button>
      </div>
    </div>
  )
}

export default HomePage
