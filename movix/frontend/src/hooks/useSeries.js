import MovieReducer from "../reducer/movieReducer";
import { seriesDiscovery } from "../service/movieService";
import { useReducer,useEffect } from "react"

export default function useSeries(page){
    const [state,dispatch]=useReducer(MovieReducer,{status:'idle',data:[],error:null});

    useEffect(()=>{
        let ignore=false;
        dispatch({type:"LOADING"});
        const fetchedMovie=async ()=>{
            try{
                const movies=await seriesDiscovery(page);
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
    },[page])
    return state;
}