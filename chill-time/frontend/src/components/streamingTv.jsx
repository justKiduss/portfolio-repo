import { useState } from "react";
import Comment from "./comment";
export default function StreamingTv({movie,movieId,selectedEpisode,selectedNum}){
    const [comment,setComment]=useState(false);
    if(!movie || !movieId) return null;
    if (!selectedNum || !selectedEpisode) {
        return (
            <div className="w-full aspect-video bg-black flex items-center justify-center text-white">
            Select season and episode
            </div>
        );
    }
    const src=`https://vsembed.ru/embed/tv/${movieId}/${selectedNum}/${selectedEpisode}`;


    return(

        <div className="max-w-5xl mx-auto p-4 space-y-6">

        {/* Video Section */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow">
            {src?
                (<iframe src={src} className="w-full h-full" allowFullScreen/> ):
               ( <p className="text-white p-4">Select season and episode</p> )    
            }
        </div>
            <div>
                <button onClick={()=>setComment((t)=>!t)}>Comment</button>
                 {comment?(<Comment movieId={movieId} moviename={movie.title || movie.name}/>):null} 
            </div>
        {/* Movie Info */}

            <div className="flex flex-col md:flex-row gap-6">
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 rounded-lg shadow"
                />

                <div className="space-y-3">
                    <h1 className="text-2xl font-bold">{movie.title}</h1>

                    <p className="text-gray-600 leading-relaxed">
                        {movie.overview}
                    </p>

                    <div className="text-sm text-gray-500">
                        Rating: <span className="font-medium">{movie.rating}</span>
                    </div>
                </div> 
            </div>

        </div>
    )
}