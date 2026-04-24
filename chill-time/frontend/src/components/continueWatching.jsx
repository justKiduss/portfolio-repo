 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { ChevronLeft,ChevronRight } from "lucide-react";
 export default function ContinueWatching(){
    const [data,setData]=useState([]);
    const [currentIndex,setCurrentIndex]=useState(0);

    useEffect(()=>{
    const watching=localStorage.getItem('continue_watching');
        setData(JSON.parse(watching) || []);
    },[])

    const prevSlide=()=>{
        setCurrentIndex((prev) => (prev - 1 + data.length)%data.length);
    }
    const nextSlide=()=>{
        setCurrentIndex((prev) => (prev + 1 + data.length)%data.length);
    }

    if (data.length === 0) return null;
     return(
            <>
            <div className="relative group m-10">
                <h1 className="text-2xl m-10">Continue Watching</h1>
                    <div className="overflow-hidden rounded-xl">
                    <div 
                        className="flex transition-transform duration-500 ease-out gap-4"
                        style={{ transform: `translateX(-${currentIndex * 220}px)` }} 
                    >
                        {data.map((movie) => (
                            <div key={movie.movieId} className="w-[200px] flex flex-col">
                                <Link to={`/${movie.type || 'movie'}/${movie.movieId}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}
                                        className="w-full rounded-lg shadow-md hover:scale-105 transition-transform"
                                    />
                                </Link>
                                <p className="mt-2 text-sm font-semibold truncate">{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                    {data.length > 1 && (
                        <>
                            <button onClick={prevSlide} className="absolute left-[-20px] top-1/2 bg-black/50 p-2 rounded-full text-white">
                                <ChevronLeft />
                            </button>
                            <button onClick={nextSlide} className="absolute right-[-20px] top-1/2 bg-black/50 p-2 rounded-full text-white">
                                <ChevronRight />
                            </button>
                        </>
                    )}
            </div>
            </>
        )
 }