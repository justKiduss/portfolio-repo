import { AppError } from "../middleware/AppError";

const API=`https://wavvy-drzx.onrender.com/api/group-message`;

export async function allMessage(group_id:number){
    const res=await fetch(`${API}/message/${group_id}`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        credentials:"include"
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't fetch group message",404);
    return data.data;
}

export async function sendMessage(group_id:number,text:string,image?:File | null,voice?:File | null,video?:File | null){
    const res=await fetch(`${API}/${group_id}`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({text,image,voice,video,})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't send message",404);
    return data.data;
}

export async function updateMessage(group_id:number,messageId:number,text:string,image:string,voice:string,video:string){
    const res=await fetch(`${API}/${group_id}/message/${messageId}`,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({text,image,voice,video})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't update message",404);
    return data.data;
}

export async function deleteMessage(group_id:number,messageId:number){
    const res=await fetch(`${API}/${group_id}/message/${messageId}`,{
        method:"DELETE",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't delete message",404);
    return data.data;
}
