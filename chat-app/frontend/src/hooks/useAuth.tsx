import { useState } from "react";
import { signUp,loginApi, logOut, checkAuth,} from "../service/UserService";
export default function useAuth(){
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    async function signup(username:string,email:string,password:string){
        const userPayload=await signUp(username,email,password);
            setUser(userPayload);
    }
    async function login(username:string,password:string){
        const userPayload=await loginApi(username,password);
        setUser(userPayload);
    }
    async function logout(){
        await logOut();
        setUser(null);
    }

    async function checkauth(){
        const userPayload=await checkAuth();
        setUser(userPayload)
    }


    return {user,login,signup,logout,checkauth};
}