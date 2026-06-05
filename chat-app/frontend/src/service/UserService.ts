import { AppError } from "../middleware/AppError";

const API=`https://wavvy-drzx.onrender.com/api/users`;

export async function searchByName(username:string){
    const res=await fetch(`${API}/name?name=${encodeURIComponent(username)}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) throw new AppError("Could not get the user by name", 404);
    return data.data;
}

export async function signUp(username:string,email:string,password:string){
    const res=await fetch(`${API}/signup`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({username,email,password})
    });
    const data=await res.json();

    if(!res.ok) throw new AppError("signing up failed res is wrong",404)
    return data.data.user;
}

export async function loginApi(username:string,password:string){
    const res=await fetch(`${API}/login`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:"include",
        body:JSON.stringify({username,password})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("logging failed",401);
    return data.data.user;
}

export async function logOut(){
    const res=await fetch(`${API}/logout`,{
        method: "POST",
        credentials: "include"
    });
    
    if(!res.ok) throw new AppError("logout failed",401);
}

export async function checkAuth(){
    const res=await fetch(`${API}/checkauth`,{
        credentials:"include"
    });

    const data=await res.json();
    if(!res.ok) throw new AppError("user not authenticated",401);
    console.log("data from checkauth",data)
    return data.data.user
}