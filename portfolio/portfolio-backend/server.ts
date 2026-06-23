import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type {Request,Response} from "express";
import cors from "cors";
import router from "./routes/githubRoutes";

const app =express();
const port=process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin:"*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// console.log("token",process.env.GITHUB_ACCESSTOKEN);
// console.log("username",process.env.GIT_USERNAME);

app.get("/api",(req:Request,res:Response)=>{
    res.send("Api is working");
})
app.use("/api",router);

if(process.env.NODE_ENV==="development"){
    app.listen(port,()=>{
        console.log(`Server running in the http://localhost:${port}`);
    })
}
// export default app;

