const isDev = (process.env.NODE_ENV || "").toLowerCase() === "development";

const API=isDev ? 
        "http://localhost:5000/api/watchLater":
        `https://movix-backend-ashen.vercel.app/api/watchLater`;


export async function getAllWatchLaterService(){
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

export async function addWatchLaterService(watchLater){
    const {movieId,title,poster,type,timestamp}=watchLater;
    try{
        const response=await fetch(`${API}/addToWatchLater`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({movieId,title,poster,type,timestamp}),
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