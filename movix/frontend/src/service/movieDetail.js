const APIKEY=process.env.REACT_APP_APIKEY;

export default async function MovieDetailService(id){
    if(!APIKEY){
       throw new Error("API key missing"); 
    }
    console.log(APIKEY);
    console.log(id);

    const res=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`);
    const data=await res.json();
    if(!res.ok) throw new Error("failed to fetch movie");
    console.log(data);
    return data;
}