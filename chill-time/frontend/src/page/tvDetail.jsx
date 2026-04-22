import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { tvSeries, tvSeriesEpisodes } from "../service/movieService";
import StreamingTv from "../components/streamingTv";
export default function TvDetail(){
    const {movieId}=useParams();
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true);
    const [seasons,setSeasons]=useState([]);
    const [episodes,setEpisodes]=useState([]);
    const [selectedSeason,setselectedSeason]=useState(1);
    const [selectedEpisode,setSelectedEpisode]=useState(1);
    const [tv,setTv]=useState(null);
    useEffect(()=>{
        async function load(){
            try{
                setLoading(true);
                setError(false);
                const data=await tvSeries(movieId);
                const normalized={
                    id:data.id,
                    title:data.title || data.name,
                    poster_path:data.poster_path,
                    backdrop_path: data.backdrop_path,
                    rating: data.vote_average,
                    overview: data.overview,
                }

                setTv(normalized);
                setSeasons(data.seasons);
            }catch(err){
                setError("failed to load tv series");
            }finally{
                setLoading(false);
            }
        }
        load();
    },[movieId])

    useEffect(()=>{
        if(!selectedSeason) return;
        async function episodeload(){
            try{
                setLoading(true);
                setError(false);
                const data=await tvSeriesEpisodes(movieId,selectedSeason);
                setEpisodes(data);
            }catch(err){
                setError("failed to load tv series episodes");
            }finally{
                setLoading(false);
            }
        }
        episodeload();
    },[movieId,selectedSeason])

    useEffect(()=>{
        if(tv&&selectedSeason && selectedEpisode){
            const history=JSON.parse(localStorage.getItem("continue_watching")||"[]")
            const watchHistory={
                movieId,
                title:tv.title,
                season:selectedSeason,
                episode:selectedEpisode,
                poster:tv.poster_path,
                type:'tv',
                timestamp:Date.now()
            };

            const updated=[watchHistory,...history.filter(item=>item.movieId !== movieId)].slice(0,10);
            localStorage.setItem('continue_watching',JSON.stringify(updated));
        }
    },[selectedSeason,selectedEpisode,tv,movieId])
    useEffect(() => {
            const history = JSON.parse(localStorage.getItem('continue_watching') || "[]");
            const saved = history.find(item => item.movieId === movieId);

            if (saved) {
                setselectedSeason(saved.season);
                setSelectedEpisode(saved.episode);
            } else {
                setselectedSeason(1);
                setSelectedEpisode(1);
            }
    }, [movieId]);

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
    // const ContinueWatching=localStorage.setItem("continue",JSON.parse())


    return(

        <>
            <div>
                <StreamingTv selectedEpisode={selectedEpisode} 
                    movieId={movieId} 
                    selectedNum={selectedSeason} 
                    movie={tv}
                />

                {/* Seasons Row */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {seasons.map((season) => (
                    <button 
                    key={season.id} 
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                        selectedSeason === season.season_number ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => {
                        setselectedSeason(season.season_number);
                        setSelectedEpisode(1); // Reset episode when season changes!
                    }}
                    >
                    {season.name}
                    </button>
                ))}
                </div>

                {/* Episode Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {episodes.map((ep) => (
                    <button 
                    key={ep.id} 
                    className={`p-3 rounded-lg text-left border ${
                        selectedEpisode === ep.episode_number ? "border-blue-500 bg-blue-500/10" : "border-gray-800 bg-gray-900"
                    }`}
                    onClick={() => setSelectedEpisode(ep.episode_number)}
                    >
                    <span className="text-xs text-gray-500 block">Episode {ep.episode_number}</span>
                    <span className="font-medium text-sm">{ep.name}</span>
                    </button>
                ))}
                </div>
            </div>
        </>
    )
}