import {Conversation} from "../models/conversationModel.js"
import {Message} from "../models/messageModel.js"
import mongoose from "mongoose";
import { getIOInstance, getReceiverSocketId } from "../socket/socket.js";
export const sendMessage=async(req,res)=>
{
    try {
        // console.log("Decoded user ID:", req.id);
        const senderId=req.id;
        const recieverId=req.params.id;
        // console.log(senderId,recieverId);
        const {message}=req.body;
        let gotConversation=await Conversation.findOne({
            participants:{$all:[senderId, recieverId]},
        });
        if(!gotConversation)
        {
            gotConversation=await Conversation.create({
                participants:[senderId,recieverId]
            })
        }
        const newMessage=await Message.create({
            senderId,
            recieverId,
            message
        });
        if(newMessage)
        {
            gotConversation.messages.push(newMessage._id);
        };
        // await gotConversation.save();
        await Promise.all([gotConversation.save()],[newMessage.save()])
        //SOCKET IO
        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
        const io = getIOInstance();
        io.to(receiverSocketId).emit("newMessage", newMessage);
        console.log(`📩 Sent message to ${recieverId} at ${receiverSocketId}`);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req, res) => {
    try {
        const recieverId = req.params.id;
        const senderId = req.id;
        // console.log(recieverId);
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recieverId)) {
            return res.status(400).json({ message: "Invalid senderId or recieverId" });
        }
        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(recieverId);
        const conversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]); 
        }
        // console.log(conversation.messages);
        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error in getMessage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};