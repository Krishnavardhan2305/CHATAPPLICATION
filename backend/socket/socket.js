import { Server } from "socket.io";

const userSocketMap = {}; // Maps userId -> socketId
let io;

export const setupSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], 
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id; // Store userId -> socketId
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const getIOInstance = () => io;
