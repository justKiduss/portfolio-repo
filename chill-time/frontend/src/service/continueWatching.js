const isDev = (process.env.NODE_ENV || "").toLowerCase() === "development";

const API=isDev ? 
        "http://localhost:5000/api/reviews":
        `https://movix-backend-ashen.vercel.app/api/continue`;


export async function getAllContinueWatchingService(){
    try{
        const response=await fetch(`${API}/getAll`,{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");

        const result=await data.data;
        return result;

    }catch(error){
        throw new Error("couldn't reach backend");
    }
}

export async function addContinueWatchingService(){
    try{
        const response=await fetch(`${API}/addTOContinue`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({movie_id,movie_title,posterPath}),
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");

        const result=await data.data;
        return result;

    }catch(error){
        throw new Error("couldn't reach backend");
    }
}