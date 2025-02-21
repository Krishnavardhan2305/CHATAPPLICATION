import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket); // Get socket from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && !socket) {
      const newSocket = io("http://localhost:8080", {
        query: { userId: authUser._id },
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        console.log("✅ Connected to socket:", newSocket.id);
        dispatch(setSocket(newSocket)); // Store socket in Redux

        newSocket.on("getOnlineUsers", (onlineUsers) => {
          dispatch(setOnlineUsers(onlineUsers));
        });
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err);
      });

      return () => {
        newSocket.disconnect();
        dispatch(setSocket(null)); // Clear socket in Redux on disconnect
      };
    }

    if (!authUser && socket) {
      socket.close();
      dispatch(setSocket(null)); // Ensure socket is cleared when user logs out
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
