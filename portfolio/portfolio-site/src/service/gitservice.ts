export default async function GitService(){
    try{
        const response=await fetch('https://portfolio-psi-pink-as9zdg26th.vercel.app/api/github-activity');
        console.log("respnse",response);
        if(!response.ok) throw new Error("Server not responding");
        return await response.json();
    }catch(error){
        console.log(error);
        throw error;
    }
}