import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
});

const onlineUsers: {[key:number]: { socketId: string; username: string } }={};

io.on("connection",(socket)=>{
    const userId=Number(socket.handshake.query.userId);
    const username = socket.handshake.query.username as string;

    if(userId){
        onlineUsers[userId]={
            socketId:socket.id,
            username:username
        };
        const broadcastList = Object.entries(onlineUsers).map(([id, data]) => ({
            userId: Number(id),
            username: data.username
        }));

        io.emit('onlineUsers', broadcastList);
    }
    socket.on("disconnect", () => {
        if (userId) {
            delete onlineUsers[userId];
            
            const broadcastList = Object.entries(onlineUsers).map(([id, data]) => ({
                userId: Number(id),
                username: data.username
            }));
            
            io.emit("onlineUsers", broadcastList);
        }
    });
});

export function getReceiverSocketId(receiverId: number) {
    // Safely look up via both string and numeric variants
    return onlineUsers[receiverId]?.socketId || onlineUsers[String(receiverId) as any]?.socketId;
}

export { io, app, server };

