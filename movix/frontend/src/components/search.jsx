import { useOutletContext } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Search(){
    const {query}=useOutletContext();
    const [pageNo,setPageNo]=useState(1);
    const [allMovies,setallMovies]=useState([]);

    const {data,status}=useMovies(query,pageNo);

    useEffect(()=>{
        setallMovies([]);
        setPageNo(1);
    },[query])

    useEffect(()=>{
        if(data){
            setallMovies((prev)=>[...prev,...data])
        }
    },[data]);
        return(
            <>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                    {allMovies.map((movie) => (
                        <div key={movie.movieId} className="flex flex-col">
                            <Link to={`/${movie.type || 'movie'}/${movie.movieId}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className="w-full rounded-lg shadow-md hover:scale-105 transition-transform"
                                />
                            </Link>
                            <p className="mt-2 text-sm font-semibold truncate">
                                {movie.className}
                            </p>
                        </div>
                    ))}
                </div>

                {allMovies.length > 0 && (
                    <button 
                        onClick={() => setPageNo(prev => prev + 1)}
                        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? "Loading..." : "More Results"}
                    </button>
                )}
            </div>
            </>
        )
}