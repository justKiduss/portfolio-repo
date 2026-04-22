import MovieReducer from "../reducer/movieReducer";
import { Movie, SearchMovie } from "../service/movieService";
import { useReducer,useEffect } from "react"

export default function useMovies(query,page=1){
    const [state,dispatch]=useReducer(MovieReducer,{status:'idle',data:[],error:null});

    useEffect(()=>{
        let ignore=false;
        dispatch({type:"LOADING"});
        const fetchedMovie=async ()=>{
            try{
                const movies=query?await SearchMovie(query):await Movie(page);
                if(!ignore){
                    dispatch({
                        type:"SUCCESS",
                        payload:movies.results
                    })
                }
            }catch(err){
                if(!ignore){
                    dispatch({
                        type:'FAILURE',
                        payload:err.message
                    })
                }
            }
        }
        fetchedMovie();
        return()=>{
            ignore=true;
        }
    },[query,page])
    return state;
}