const APIKEY=process.env.REACT_APP_APIKEY;
export async function Movie(page){
    try{
        // https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1
        const movie= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&page=${page}`);
            if(!movie.ok) throw new Error("server responden with a error");
            return await movie.json(); 
    }catch{
        throw new Error("Error while fetching");
    }
}

export async function SearchMovie(query){
    try{
        const movie=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&query=${query}&language=en-US`);
        return await movie.json();
    }catch{
        throw new Error("error while fetching");
    }
}

export async function trendingMovies(){
    try{
        const movie=await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`);
        const data=await movie.json();
        return data.results;
    }catch{
        throw new Error("error while fegtching");
    }
}

export async function popularMovies(){
    try{
        const movie=await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&page=1`);
        const data=await movie.json();
        return data.results;
    }catch{
        throw new Error("error while fetching");
    }
}

export async function tvSeries(id){
    try{
        const tv=await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIKEY}`);
        const data=await tv.json();
        if(!tv.ok) throw new Error("failed");
        return data;
    }catch{
        throw new Error("Error while fetching")
    }
}

export async function tvSeriesEpisodes(tvId,season){
    try{
        const res=await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${season}?api_key=${APIKEY}`);
        const data=await res.json();
        if(!res.ok) throw new Error("failed");
        return data.episodes;
    }catch{
        throw new Error("error while fetching");
    }
}

export async function seriesDiscovery(page){
    try{
        const res=await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&page=${page}`);
        const data=await res.json();
        if(!res.ok) throw new Error('failed');
        return data;
    }catch{
        throw new Error("error while fetching");
    }
}

