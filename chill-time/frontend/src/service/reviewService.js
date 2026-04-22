// http://localhost:5000/api

const API=`https://movix-twcp.onrender.com/api`;
function getToken() {
  return localStorage.getItem("token");
}
export async function createReview(movie_id,movie_title,rating,review){
    try{
        const response=await fetch(`${API}/reviews`,{
            method:'POST',
            headers:{'Content-Type':'application/json', Authorization: `Bearer ${getToken()}`},
            body:JSON.stringify({movie_id,movie_title,rating,review})
        });
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        console.log("createing review",data.data);
        return await data.data;

    }catch{
        throw new Error("couldn't reach backend");
    }
}

export async function getAllReviews(movieId){
    try{
        const response=await fetch(`${API}/reviews/movie/${movieId}`,{
            method:'GET',
            // headers:{'Content-Type':'application/json'},
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        console.log("get reviews",data.data,movieId);
        return await data.data;
        
    }catch{
        throw new Error("couldn't reach backend");
    }
}

export async function updateReviews(id,movie_id,movie_title,rating,review){
    try{
        const response=await fetch(`${API}/reviews/${id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json', Authorization: `Bearer ${getToken()}`},
            body:JSON.stringify({movie_id,movie_title,rating,review})
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
        const response=await fetch(`${API}/reviews/${id}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json', Authorization: `Bearer ${getToken()}`}
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        return await data.data;
    }catch{
        throw new Error("couldn't reach backend");
    }
}
