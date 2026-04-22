// const API="http://localhost:5000/api/user";
const API=`https://movix-twcp.onrender.com/api/user`;

export async function Login(email,password){
    const res=await fetch(`${API}/login`,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({email,password})
    });
    const data=await res.json();
    if(!res.ok) throw new Error(data.error || "login failed");
    return {
        user:data.data.user,
        token:data.data.token
    };
}