const isDev = (process.env.NODE_ENV || "").toLowerCase() === "development";

const API=isDev ? 
        "http://localhost:5000/api/user":
        `https://movix-backend-ashen.vercel.app/api/user`;

export async function Login(username,password){
    const res=await fetch(`${API}/login`,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        credentials:'include',
        body:JSON.stringify({username,password})
    });
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || "login failed");
    return {
        user:data.user,
    };
}

export async function Signup(username,email,password){
    const res=await fetch(`${API}/`,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        credentials:'include',
        body:JSON.stringify({username,email,password})
    })
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || "signing up failed");
}

export async function LogOut(){
    const res =await fetch(`${API}/logout`,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        credentials:'include'
    })
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || "logging out failed");
}

export async function checkAuth(){
    const res=await fetch(`${API}/checkAuth`,{
        method:"GET",
        headers: {'Content-Type': 'application/json'},
        credentials:'include'
    });
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || "user hasn't logged in");
    return data;
}