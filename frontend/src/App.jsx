import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/" /> : <Login />,
    },
  ]);

  useEffect(() => {
    if (authUser && !socket) {
      const newSocket = io("http://localhost:8080", {
        query: { userId: authUser._id },
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        newSocket.disconnect();
        dispatch(setSocket(null));
      };
    }

    if (!authUser && socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [authUser, socket, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;