const isDev = (process.env.NODE_ENV || "").toLowerCase() === "development";

const API=isDev ? 
        "http://localhost:5000/api/continue":
        `https://movix-backend-ashen.vercel.app/api/continue`;

const transformMovieData = (data) => ({
  movieId: data.movie_id,
  title: data.title,
  poster: data.poster,
  type: data.type,
  season: data.season,
  episode: data.episode,
  timestamp: data.timestamp
});
export async function getAllContinueWatchingService(){
    try{
        const response=await fetch(`${API}/getAll`,{
            method:'GET',
            headers:{'Content-Type':'application/json',
                'Cache-Control': 'no-cache', // Tells browser to fetch fresh data
                'Pragma': 'no-cache'
            },
            credentials:'include'
        })
        const data=await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed");
        return transformMovieData(data.data);

    }catch(error){
        throw new Error("couldn't reach backend");
    }
}

export async function addContinueWatchingService(watchHistory){
     const { movieId, title, poster, type, timestamp, season, episode } = watchHistory;
    try{
        const response=await fetch(`${API}/addTOContinue`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                movieId,title,poster,type,timestamp,season,episode
            }),
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