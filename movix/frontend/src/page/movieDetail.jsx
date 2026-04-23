import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailService from "../service/movieDetail";
import Streaming from "../components/streaming";
export default function MovieDetail(){
    const {movieId}=useParams();
    const [movie,setMovie]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{

        async function load(){
            try{
                setLoading(true);
                setError(null);
              const data=await MovieDetailService(movieId);
              const normalized={
                    id:data.id,
                    title:data.title || data.name,
                    poster_path:data.poster_path,
                    backdrop_path: data.backdrop_path,
                    rating: data.vote_average,
                    overview: data.overview,
                }
                setMovie(normalized);
            }catch(err){
                setError("failed to load movie")
            }finally{
                setLoading(false);
            }
        }

        load();
    },[movieId]);

    if(loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }
    if (error) {
        return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">{error}</p>
        </div>
        );
    }
    if (!movie) return null;
    return (
       <Streaming movie={movie}
            movieId={movieId}
       />
    )
}