export default async function GitService(){
    try{
        // https://portfolio-repo-pi-wheat.vercel.app/api/github-activity
        const response=await fetch('/api/github-activity');

        if(!response.ok) throw new Error("Server not responding");
        return await response.json();
    }catch(error){
        console.log(error);
        throw error;
    }
}