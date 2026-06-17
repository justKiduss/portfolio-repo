import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getById } from "../service/UserService";
import useAuth from "../hooks/useAuth";

export function Profile(){
    const {id}=useParams();
    const [profile,setProfile]=useState<any>(null)
    const { logout } = useAuth();

    useEffect(()=>{
        async function fetchProfile(id:number){
            if(!id) return;
            const res=await getById(id);
            setProfile(res);
        }
        fetchProfile(Number(id));

    },[id])
    if(!profile) return <div>Loading ...</div>
    console.log(profile)
    return(
        <>
            <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
                <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                    
                    {/* Header: Avatar + Status */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-32 h-32 mb-4">
                            <img 
                                src={profile.profilePic} 
                                alt={profile.username} 
                                className="w-full h-full rounded-full object-cover border-4 border-zinc-800"
                            />
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-zinc-900" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">{profile.username}</h2>
                        <p className="text-zinc-500 text-sm">{profile.email}</p>
                    </div>

                    {/* Data Grid: Future-Proof Fields */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Bio</label>
                            <p className="text-zinc-200 mt-1 italic">
                                {profile.bio || "No bio yet. Tell us about yourself!"}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Phone</label>
                                <p className="text-zinc-200 mt-1">{profile.phoneNumber || "Not set"}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Joined</label>
                                <p className="text-zinc-200 mt-1">{new Date(profile.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition">
                            Edit Profile
                        </button>
                        <button 
                            onClick={logout}
                            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium rounded-xl transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}