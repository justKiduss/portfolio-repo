import { AppError } from "../middleware/AppError";

const API=import.meta.env.DEV?
    `${import.meta.env.VITE_API}/group-member`
    :`${import.meta.env.VITE_API_URL}/group-member`

export async function allMembers(group_id:number){
    const res=await fetch(`${API}/${group_id}`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        credentials:"include"
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't fetch group members",404);
    return data.data;
} 

export async function searchMember(group_name:string,group_id:number){
    const res=await fetch(`${API}/${group_id}`,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({group_name})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("could get the group member by name",404);
    return data.data;
}

export async function addMember(group_id:number,userIds:number[]){
    const res=await fetch(`${API}/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({group_id,userIds})
    })
    const data=await res.json();
    if(!res.ok) throw new AppError(data.message || "could create a member",404);
    return data.data;
}

export async function kickOutMember(group_id:number,target_user_id:number){
    const res=await fetch(`${API}/${group_id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({target_user_id})

    })
    await res.json();
    if(!res.ok) throw new AppError("couldn't kick out the user",404);
}
