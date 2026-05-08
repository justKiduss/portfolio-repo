export default async function GitService(){
    try{
        const response=await fetch('http://localhost:8000/api/github-activity');
        console.log("respnse",response);
        if(!response.ok) throw new Error("Server not responding");
        return await response.json();
    }catch(error){
        console.log(error);
        throw error;
    }
}