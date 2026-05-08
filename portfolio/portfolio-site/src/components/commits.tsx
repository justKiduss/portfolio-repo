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
        <div>
            {activityData.map((commit, index) => (
                <div key={index}>
                    <h3>{commit.repo}</h3>
                    <p>{commit.message}</p>
                    <small>{commit.date}</small>
                </div>
            ))}
        </div>
    )
}