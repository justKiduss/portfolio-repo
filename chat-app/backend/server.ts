import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import express from 'express'
import type {Request,Response} from "express";

import cors from "cors";

const app=express();
const Port=8000
app.use(express.json());

app.use(cookieParser());

app.get("/api",(req:Request,res:Response)=>{
    res.send("api is working");
})

// app.use("/api",);
app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`);
})

