const isDev = (process.env.NODE_ENV || "").toLowerCase() === "development";

const API=isDev ? 
        "http://localhost:5000/api/reviews":
        `https://movix-backend-ashen.vercel.app/api/reviews`;

export async function createReview(movie_id,movie_title,rating,review){
    try{
        const response=await fetch(`${API}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({movie_id,movie_title,rating,review}),
            credentials:'include'
        });
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        console.log("createing review",data.data);
        const result=await data.data;
        console.log("result",result);
        return result;

    }catch{
        throw new Error("couldn't reach backend");
    }
}

export async function createReply(parentId,data){
    try{

        const response = await fetch(`${API}/${parentId}`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            credentials:"include"
        });
        const result = await response.json();
        
        if(!response.ok){
            throw new Error(result.message || "Request failed");
        }
        return result.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}
export async function getAllReviews(movieId){
    try{
        const response=await fetch(`${API}/movie/${movieId}`,{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        console.log("get reviews",data.data,movieId);
        const result=await data.data;
        console.log("result",result);
        return result;
        
    }catch{
        throw new Error("couldn't reach backend");
    }
}

export async function updateReviews(id,movie_id,movie_title,rating,review){
    try{
        const response=await fetch(`${API}/${id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({movie_id,movie_title,rating,review}),
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        return await data.data;
    }catch{
        throw new Error("couldn't reach backend");
    }
}


export async function deleteReviews(id){
    try{
        const response=await fetch(`${API}/${id}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        return await data.data;
    }catch{
        throw new Error("couldn't reach backend");
    }
}
