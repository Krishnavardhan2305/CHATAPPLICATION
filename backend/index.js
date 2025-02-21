import http from "http";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setupSocketServer } from "./socket/socket.js"; 
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Create HTTP server from Express app
const server = http.createServer(app);

// Attach WebSocket to the same HTTP server
setupSocketServer(server);

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server & WebSocket running on port ${PORT}`);
});
