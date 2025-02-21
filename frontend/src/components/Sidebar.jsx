import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import OtherUsers from './OtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error('Please enter a name to search.');
      return;
    }

    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error('User not found');
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
  
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          className="input input-bordered rounded-md"
          type="text"
          value={search}
          onChange={searchHandler}
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
    </div>
  );
};

export default Sidebar;
