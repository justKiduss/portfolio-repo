import { useEffect, useState } from "react"
import GitService from "../service/gitservice";
export default function Commits(){

    type CommitType={
        repo:string,
        message:string,
        date:string,
    }
    const [activityData,setActivityData]=useState<CommitType[]>([]);
    
    useEffect(()=>{

        async function loadData(){
            const data=await GitService();
            setActivityData(data)
        }
        loadData();
    },[])
    console.log("activity",activityData);
    return(
        <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Recent Commits</h2>
        
        {activityData.map((commit, index) => (
            <div 
            key={index}
            className="bg-[#111318] border border-gray-800 rounded-xl p-4 flex items-start gap-4 hover:border-purple-500/40 transition"
            >
            {/* Left — green dot */}
            <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            
            {/* Right — content */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{commit.message}</p>
                <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-purple-400">{commit.repo.split("/")[1]}</span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-500">
                    {new Date(commit.date).toLocaleDateString("en-US", { 
                    month: "short", 
                    day: "numeric" 
                    })}
                </span>
                </div>
            </div>
            </div>
        ))}
        </div>
    )
}