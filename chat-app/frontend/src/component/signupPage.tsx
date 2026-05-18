import { useState } from "react";
import useAuth from "../hooks/useAuth";
import type { FormEvent } from "react";
export function LoginForm() {
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const { signup }=useAuth();
    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!username||!email||!password){
            throw new Error("Field are neccessary");
        }
        await signup(username,email,password);
              
        setUserName('');
        setEmail('');
        setPassword('');
    }
 return(
    <>
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-colors">
            <div className="w-96 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Login to your account</h2>

                <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">Enter your email below to login to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-sm font-medium dark:text-zinc-300">Email</label>
                        <input type="text" onChange={(e)=>setUserName(e.target.value)} value={username} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label className="text-sm font-medium dark:text-zinc-300">Password</label>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"/>
                    </div>
                    <div className="text-right mb-4">
                        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline dark:text-blue-400">Forgot your Password</a>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded mb-2 dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-opacity" type="submit">Login</button>
                </form>
                {/* <button className="w-full border py-2 rounded mb-4 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 transition-colors" onClick={handleGoogleLogin}>Login With Google</button> */}
                <p className="text-sm text-center dark:text-zinc-400">Don't have an account <a href="/signup" className="text-blue-500 hover:underline dark:text-blue-400">Sign up</a></p>
            </div>
        </div>
    </>
 ) 
}