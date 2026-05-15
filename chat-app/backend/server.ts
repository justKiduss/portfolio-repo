import type {Request,Response,NextFunction} from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import express from 'express'

import cors from "cors";
import router from "./routes/userRoutes";
import messageRouter from "./routes/messageRoute";
import { AppError } from "./middleware/error";
const app=express();
const Port=process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/api",(req:Request,res:Response)=>{
    res.send("api is working");
})

app.use('/api/users',router);
app.use('/api/messages',messageRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`);
})

