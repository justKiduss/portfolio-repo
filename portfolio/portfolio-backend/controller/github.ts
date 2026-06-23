<<<<<<< HEAD
import { Request,Response } from "express";
export async function githubActivity(req: Request,res: Response){

    const GITHUB_TOKEN=process.env.GITHUB_ACCESSTOKEN;
    console.log("username",process.env.GIT_USERNAME);
    // try{
    //     const response=await fetch(
    //             `https://api.github.com/users/${process.env.GIT_USERNAME}/events`,{
    //                 headers:{
    //                     Authorization:`Bearer ${GITHUB_TOKEN}`,
    //                     Accept:'application/vnd.github+json',
    //                 },
    //             }
    //     );
    //     if(!response.ok){
    //         return res.status(response.status).json({ error: "GitHub API request failed" });
    //     }

    //     const data=await response.json();
    //     return res.status(200).json({
    //         success:true,
    //         data:data
    //     })
    // }catch(error){
    //     return error
    // }
}


    //     const pushEvents = data
    //         .filter((e: any) => e.type === "PushEvent")
    //         .slice(0, 5);
=======
import type { Request, Response } from "express";

export async function githubActivity(req: Request, res: Response) {
    const GITHUB_TOKEN = process.env.GITHUB_ACCESSTOKEN;
    const username = process.env.GIT_USERNAME;

    console.log("Checking GitHub Username from env:", username);

    if (!username) {
        return res.status(500).json({ error: "Server Configuration Error: GIT_USERNAME is missing from env." });
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/events`, 
            {
                headers: {
                    // Changed to 'token' scheme which GitHub explicitly uses for Personal Access Tokens
                    Authorization: `token ${GITHUB_TOKEN}`, 
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": username
                },
            }
        );

        // This log will tell you exactly what went wrong
        console.log(`GitHub HTTP Status: ${response.status} (${response.statusText})`);

        if (!response.ok) {
            const errorBody = await response.text().catch(() => "No error body text");
            console.error("GitHub API Raw Error Response:", errorBody);
            
            return res.status(500).json({ 
                error: "Github fetch failed", 
                githubStatus: response.status,
                githubMessage: response.statusText 
            });
        }
        
        const data = await response.json();

        if (!Array.isArray(data)) {
            return res.status(500).json({ error: "Unexpected response structure from GitHub" });
        }

        const pushEvents = data
            .filter((e: any) => e.type === "PushEvent")
            .slice(0, 5);

        const commits = await Promise.all(
            pushEvents.map(async (e: any) => {
                const sha = e.payload?.head;
                const repo = e.repo?.name;

                if (!sha || !repo) return null;

                const commitRes = await fetch(
                    `https://api.github.com/repos/${repo}/commits/${sha}`,
                    {
                        headers: {
                            Authorization: `token ${GITHUB_TOKEN}`,
                            Accept: "application/vnd.github+json",
                            "X-GitHub-Api-Version": "2022-11-28",
                            "User-Agent": username
                        },
                    }
                );
                
                if (!commitRes.ok) return null;
                const commitData = await commitRes.json();
>>>>>>> c0207fa6cfc07f525fc191836b68844e000d976e

    //           const commits = await Promise.all(
    //         pushEvents.map(async (e: any) => {
    //             const sha = e.payload.head;
    //             const repo = e.repo.name;

<<<<<<< HEAD
    //             // Fetch the actual commit using the SHA
    //             const commitRes = await fetch(
    //                 `https://api.github.com/repos/${repo}/commits/${sha}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${GITHUB_TOKEN}`,
    //                         Accept: 'application/vnd. github+json',
    //                     },
    //                 }
    //             );
    //              const commitData = await commitRes.json();

    //             return {
    //                 repo,
    //                 message: commitData.commit?.message || "No message",
    //                 date: e.created_at,
    //             };
    //         })
    //     );

    //     res.json(commits);
    // }catch{
    //     res.status(500).json({ error: "Server error" });
    // }
=======
        res.json(commits.filter(Boolean));

    } catch (error) {
        console.error("Internal Server Catch Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}
// import type {Request,Response} from "express";

// export async function githubActivity(req: Request,res: Response){
//     const GITHUB_TOKEN=process.env.GITHUB_ACCESSTOKEN;

//     console.log("username",process.env.GIT_USERNAME);
//     try{
//         const response=await fetch(
//                 `https://api.github.com/users/${process.env.GIT_USERNAME}/events`,{
//                     headers:{
//                         Authorization:`Bearer ${GITHUB_TOKEN}`,
//                         Accept:'application/vnd.github+json',
//                     },
//                 }
//         );
//         console.log("response",response);
//         if(!response.ok){
//             return res.status(500).json({error:"Github fetch failed"});
//         }
//         const data = await response.json();

//         console.log("dita",data);
//         const pushEvents = data
//             .filter((e: any) => e.type === "PushEvent")
//             .slice(0, 5);

//               const commits = await Promise.all(
//             pushEvents.map(async (e: any) => {
//                 const sha = e.payload.head;
//                 const repo = e.repo.name;

//                 // Fetch the actual commit using the SHA
//                 const commitRes = await fetch(
//                     `https://api.github.com/repos/${repo}/commits/${sha}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${GITHUB_TOKEN}`,
//                             Accept: 'application/vnd.github+json',
//                         },
//                     }
//                 );
//                  const commitData = await commitRes.json();

//                 return {
//                     repo,
//                     message: commitData.commit?.message || "No message",
//                     date: e.created_at,
//                 };
//             })
//         );

//         res.json(commits);
//     }catch{
//         res.status(500).json({ error: "Server error" });
//     }
// }
>>>>>>> c0207fa6cfc07f525fc191836b68844e000d976e
