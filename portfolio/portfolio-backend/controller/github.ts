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

    //           const commits = await Promise.all(
    //         pushEvents.map(async (e: any) => {
    //             const sha = e.payload.head;
    //             const repo = e.repo.name;

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