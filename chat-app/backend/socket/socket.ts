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

const onlineUsers: {[key:number]:string}={};

io.on("connection",(socket)=>{
    const userId=Number(socket.handshake.query.id);
    
    if(userId){
        onlineUsers[userId]=socket.id;
        io.emit('onlineUsers',Object.keys(onlineUsers).map(Number));
    }
    socket.on("disconnect",()=>{
        delete onlineUsers[userId];
        io.emit("onlineUsers",Object.keys(onlineUsers).map(Number))
    });
});

export function getReceiverSocketId(receiverId: number) {
    return onlineUsers[receiverId];
}

export { io, app, server };

