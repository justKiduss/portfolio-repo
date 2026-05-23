import { AppError } from "../middleware/AppError";

const API='http://localhost:8000/api/messages'
export async function GetConversation(id:number){
    const res=await fetch(`${API}/${id}`,{
        method:'GET'
    });
    const data=await res.json();
    if(!res.ok) throw new AppError('Chat failed to fetch',401);

    return await data.data;
}

export async function SendMessage(id:number,text:string,image:string){
    const res=await fetch(`${API}/${id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({text,image})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError('failed to send a message',401);
    return await data.data;
}