// import { useState } from "react";
// import useAuth from "../hooks/useAuth"

// export default function SignUpForm(){
//     const [username,setUsername]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const {signup}=useAuth();

//     async function handleSubmit(e){
//         e.preventDefault();

//         if(!username||!email||!password){
//             throw new Error("Field are neccessary");
//         }
//         await signup(username,email,password);

//         setUsername("");
//         setEmail("");
//         setPassword("");

//     }


//     return(
//         <>
//             <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-colors">
//                 <div className="w-96 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md border dark:border-zinc-800">
//                     <h2 className="text-2xl font-bold mb-2 dark:text-white">Create your account</h2>
//                     <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">Enter your details below to sign up </p>

//                     <div className="flex flex-col gap-2 mb-4">
//                         <label className="text-sm font-medium dark:text-zinc-300">Username</label>
//                         <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"/>
//                     </div>

//                     <div className="flex flex-col gap-2 mb-2">
//                         <label className="text-sm font-medium dark:text-zinc-300">Email</label>
//                         <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"/>
//                     </div>

//                     <div className="flex flex-col gap-2 mb-2">
//                         <label className="text-sm font-medium dark:text-zinc-300">Password</label>
//                         <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"/>
//                     </div>

//                     <button type="submit" onClick={handleSubmit} className="w-full bg-black text-white py-2 rounded mt-4 dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-all"> Sign Up</button>
//                     <p className="text-sm text-center my-4 my-4 dark:text-zinc-400">Already have an account? {" "} 
//                         <a href="/login" className="text-blue-500 hover:underline dark:text-blue-400">Login</a>
//                     </p>
//                 </div>
                
//             </div>
//         </>
//     )
// } 

import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await signup(username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Couldn't create your account. Try again.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-colors">
      <div className="w-96 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md border dark:border-zinc-800">
        <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-cyan-600 dark:text-[#2DE2C1]">
          Get started
        </span>
        <h2 className="text-2xl font-['Barlow_Condensed'] font-bold mt-1 mb-2 dark:text-white">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
          Enter your details below to sign up.
        </p>

        {error && (
          <p className="text-sm text-rose-600 dark:text-[#FF3E7F] mb-4 font-['JetBrains_Mono']">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium dark:text-zinc-300">Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium dark:text-zinc-300">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium dark:text-zinc-300">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center my-4 dark:text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-600 hover:underline dark:text-[#2DE2C1]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}