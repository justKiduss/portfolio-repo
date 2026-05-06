import express, {Request,Response} from "express";

const app =express();
const port=5000;

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Api is working");
})

app.listen(port,()=>{
    console.log(`Server running in the ${port}`);
})

