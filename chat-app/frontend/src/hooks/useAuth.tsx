import { useState } from "react";
import { signUp,loginApi} from "../service/UserService";
export default function useAuth(){
    const [user,setUser]=useState(null);
    async function signup(username:string,email:string,password:string){
        const response=await signUp(username,email,password);
            setUser(response.user);
    }
    async function login(username:string,password:string){
        const response=await loginApi(username,password);
        setUser(response.user);
    }
    return {user,login,signup};
}