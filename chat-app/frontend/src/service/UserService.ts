import { AppError } from "../middleware/AppError";

const API=`http://localhost:8000/api/users`
export async function signUp(username:string,email:string,password:string){
    const res=await fetch(`${API}/signup`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,email,password})
    });
    const data=await res.json();

    if(!res.ok) throw new AppError("signing up failed res is wrong",404)
    return await data.data;
}

export async function loginApi(username:string,password:string){
    const res=await fetch(`${API}/login`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,password})
    });
    const data=await res.json();
    if(!res.ok) throw new AppError("logging failed",401);
    return await data.data
}