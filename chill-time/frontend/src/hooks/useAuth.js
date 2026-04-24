import { useState } from "react";

import { Login, Signup } from "../service/authService";

export default function useAuth(){
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(localStorage.getItem("token") || null);

    async function login(email,password){
        const {user,token}=await Login(email,password);
        setToken(token);
        setUser(user);
        localStorage.setItem('token',token);
    }

    async function signup(username,email,password){
        await Signup(username,email,password);
    }

    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }
    return {user,token,login,logout,signup};
}