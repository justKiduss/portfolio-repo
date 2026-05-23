import { AppError } from "../middleware/AppError";

const API='http://localhost:8000/api/messages'

export async function GetConversation(id:number){
    const res=await fetch(`${API}/${id}`,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
    });
    const data=await res.json();
    if(!res.ok) throw new AppError('Chat failed to fetch',401);

    return await data.data;
}

export async function SendMessage(id:number,text:string,image?:File | null){
    const formData=new FormData();
    formData.append("text",text);
    if(image){
        formData.append("image",image);
    }
    const res=await fetch(`${API}/${id}`,{
        method:'POST',
        body:formData,
        credentials:'include'
    });
    const data=await res.json();
    if(!res.ok) throw new AppError('failed to send a message',401);
    return await data.data;
}

export async function getUserInteraction(){
    const res=await fetch(`${API}/`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        credentials:"include"
    })
    const data=await res.json();
    if(!res.ok) throw new AppError('failed to get users interactions',401);
    return data.data;
    
}