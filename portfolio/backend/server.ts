import type {Request,Response} from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import express from "express";
import router from "./routes/githubRoutes";
const app =express();
const port=process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin:"*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/api",(req:Request,res:Response)=>{
    res.send("Api is working");
})
app.use("/api",router);
app.listen(port,()=>{
    console.log(`Server running in the http://localhost:${port}`);
})

