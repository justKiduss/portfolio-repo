import { useCallback } from "react";
import { Login, Signup, LogOut,checkAuth } from "../service/authService";
import { useAuthStore } from "../store/useAuthStore";
export default function useAuth(){
    const user=useAuthStore((state)=>state.user);
    const setUser=useAuthStore((state)=>state.setUser);
    const isLoading=useAuthStore((state)=>state.isLoading);
    const setIsLoading=useAuthStore((state)=>state.setIsLoading);

    async function login(username,password){
        const userPayload=await Login(username,password);
        setUser(userPayload);

    }

    async function signup(username,email,password){
        const userPayload=await Signup(username,email,password);
        setUser(userPayload);
    }

    async function logout(){
        await LogOut();
        setUser(null);
    }

    const checkauth=useCallback(async ()=>{
        try{
            setIsLoading(true);
            const userPayload=await checkAuth();
            setUser(userPayload.data.user);
        }catch(error){
            console.error("Session verification failed:", error);
            setUser(null);
        }finally{
            setIsLoading(false);
        }
    },[setUser,setIsLoading]);
    return {user,login,logout,signup,checkauth,isLoading};
}