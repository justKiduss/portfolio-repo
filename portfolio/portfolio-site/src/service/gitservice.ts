export default async function GitService(){
    try{
        // https://portfolio-repo-pi-wheat.vercel.app/api/github-activity
<<<<<<< HEAD
        const response=await fetch('/api/github-activity');

=======
        const response=await fetch('http://localhost:8000/api/github-activity');
>>>>>>> c0207fa6cfc07f525fc191836b68844e000d976e
        if(!response.ok) throw new Error("Server not responding");
        return await response.json();
    }catch(error){
        console.log(error);
        throw error;
    }
}