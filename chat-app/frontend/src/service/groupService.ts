import { AppError } from "../middleware/AppError";

const API=`${import.meta.env.VITE_API_URL}/group`;

export async function allGroups(){
    const res=await fetch(`${API}/`,{
        method:"GET",
        credentials:"include"
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't fetch allgroups",404);
    return data.data;
} 

// Inside your groupService.ts file
export async function getGroupsByName(group_name: string) {
    const res = await fetch(`${API}/group_name?name=${encodeURIComponent(group_name)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    
    const data = await res.json();
    if (!res.ok) throw new AppError("Could not get the group by name", 404);
    return data.data;
}

export async function createAgroup(group_name:string){
    const res=await fetch(`${API}/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({group_name})
    })
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't create a group",404);
    return data.data;
}

export async function deleteGroup(group_id:number,){
    const res=await fetch(`${API}/${group_id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
    })
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't delete the group",404);
    return data;
}

export async function checkGroupAdmin(group_id:number){
    const res=await fetch(`${API}/${group_id}/isAdmin`,{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("couldn't get if admin or not",404);
    return data.isAdmin;
}