import { useState } from "react";

import { Login } from "../service/authService";

export default function useAuth(){
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(localStorage.getItem("token") || null);

    async function login(email,password){
        const {user,token}=await Login(email,password);
        setToken(token);
        setUser(user);
        localStorage.setItem('token',token);
    }

    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }
    return {user,token,login,logout};
}