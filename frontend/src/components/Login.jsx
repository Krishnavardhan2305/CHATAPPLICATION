import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice.js';
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
        toast.success("Login Success");
        dispatch(setAuthUser(response.data));
        navigate('/');

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-w-96 mx-auto flex justify-center items-center h-screen">
      <div className="bg-white-600 rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-200 p-6 w-96">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-100">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-100">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="******"
              className="w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <Link to="/register" className="font-bold text-xl text-grey block mt-2">
            New User? Signup
          </Link>
          <button type="submit" className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
