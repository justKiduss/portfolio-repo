import { useState } from "react";
import useAuth from "../hooks/useAuth";
export function LoginForm() {
    const {login} =useAuth();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleSubmit(e){
        e.preventDefault();

        await login(email,password);  
              
        setEmail("");
        setPassword('');
    }
    
 return(
    <>
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">Login to your account</h2>

                <p className="text-sm text-gray-500 mb-6">Enter your email below to login to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-sm font-medium">Email</label>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="text-right mb-4">
                        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot your Password</a>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded mb-2" type="submit">Login</button>
                </form>
                <button className="w-full border py-2 rounded mb-4">Login With Google</button>
                <p className="text-sm text-center">Don't have an account <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a></p>
            </div>
        </div>
    </>
 ) 
}
