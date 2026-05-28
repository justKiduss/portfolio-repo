import type {Request,Response,NextFunction} from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from 'express'

import cors from "cors";
import messageRouter from "./routes/messageRoute";
import { AppError } from "./middleware/error";
import userRouter from "./routes/userRoutes";
import {app,server } from "./socket/socket";
import groupRoute from "./routes/groupRoute";
import groupMember_route from "./routes/groupMember_Route";

const Port=process.env.PORT;

// socket.io connection 

// const io=new Server();

// const pubClient=createClient({ host:"localhost",port:8000 });
// const subClient=pubClient.duplicate();

// io.adapter(createAdapter(pubClient, subClient));

// io.on("connection",(socket)=>{

// })

// // redis@3
// io.listen(3000);

// // redis@4
// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
//   io.listen(3000);
// })

// app.listen(Port);
// io.on("connection", (socket) => {
//   // ...
// });
// fired upon the connection with client

// io.on("new_namespace",(namespace)=>{
 
// })
// fired when a new namespace is created

// io.of("/").emit("hi","sport fans")
// This only sends to users connected to the "/sports" namespace
// io.of("/sports").emit("hi", "sports fans");
//




app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.set("trust proxy",1);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static("uploads"));
app.get("/api",(req:Request,res:Response)=>{
    res.send("api is working");
})

app.use('/api/users',userRouter);
app.use('/api/messages',messageRouter);
app.use('/api/group',groupRoute);
app.use('/api/group-member',groupMember_route);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

server.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`);
})

