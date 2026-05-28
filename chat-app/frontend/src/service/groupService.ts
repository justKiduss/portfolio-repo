import { AppError } from "../middleware/AppError";

const API=`/api/group`;

export async function allGroups(){
    const res=await fetch(`${API}/`,{
        method:"GET",
        credentials:"include"
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't fetch allgroups",404);
    return data.data;
} 

export async function getGroupsByName(group_name:string){
    const res=await fetch(`${API}/group_name`,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({group_name})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("could get the group by name",404);
    return data.data;
}

export async function createAgroup(group_name:string){
    const res=await fetch(`S{API}/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({group_name})
    })
    const data=await res.json();
    if(!res.ok) throw new AppError("could create a group",404);
    return data.data;
}

export async function deleteGroup(group_id:number,){
    const res=await fetch(`S{API}/${group_id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
    })
    await res.json();
    if(!res.ok) throw new AppError("couldn't delete the group",404);
}