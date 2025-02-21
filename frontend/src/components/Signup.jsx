import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_ENDPOINT } from '../utils/constant.js';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password !== user.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/register`,user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-w-96 mx-auto flex justify-center items-center h-screen">
      <div className="bg-white-600 rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-200 p-6 w-96">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-100">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-100">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-100">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="******"
              className="w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="border rounded-lg p-3 flex justify-between items-center text-lg">
            <label className="flex items-center space-x-2 text-white font-bold">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 text-white font-bold">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={user.gender === 'Female'}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Female</span>
            </label>
          </div>
          <Link to="/login" className="font-bold text-xl text-gray-300 block mt-2">
            Already have an account? Login
          </Link>
          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
