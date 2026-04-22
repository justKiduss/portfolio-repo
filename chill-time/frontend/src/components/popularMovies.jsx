import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { popularMovies, trendingMovies } from "../service/movieService"
export default function PopularMovies(){
    const [movies,setMovies]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    console.log("movies ",movies);
    useEffect(()=>{
        async function loadMovies(){
            try{
                setLoading(true);
                setError(null);
                    
                const data=await popularMovies();
                setMovies(data);
            }catch(err){
                setError("failed to load movie");
            }finally{
                setLoading(false);
            }
        };
        loadMovies();
    },[])
        if(loading){
             return (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500">Loading...</p>
                </div>
            )
        }
        if(error){
            return (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-500">{error}</p>
                </div>
            );
        }
        if (!movies) return null;

        return(
            <> 
                <h1 className="text-2xl m-10">Popular Movies</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex flex-col">
                            <Link to={`/${movie.media_type || "tv"}/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className="w-full rounded-lg shadow-md hover:scale-105 transition-transform"
                                />
                            </Link>
                            <p className="mt-2 text-sm font-semibold truncate">
                                {movie.title || movie.name}
                            </p>
                        </div>
                    ))}
                </div>
            </>
        )
}