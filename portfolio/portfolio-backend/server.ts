import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type {Request,Response} from "express";
import cors from "cors";

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

app.get("/api/github-activity",async (req: Request,res: Response)=>{

    try{
        const response=await fetch(
            `https://api.github.com/users/${process.env.GIT_USERNAME}/events`,{
                headers:{
                    Authorization:`Bearer ${process.env.GITHUB_ACCESSTOKEN}`,
                    Accept:'application/vnd.github+json',
                },
                }
            );
            if(!response.ok){
                return res.status(response.status).json({ error: "GitHub API request failed" });
            }

            const data=await response.json();
            return res.status(200).json({
                success:true,
                data:data
            })

        }catch(error){
            return error
        }
    }
)

app.listen(port,()=>{
    console.log(`Server running in the http://localhost:${port}`);
})

// export default app;

