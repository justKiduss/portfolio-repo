// import MovieReducer from "../reducer/movieReducer";
// import { Movie, SearchMovie } from "../service/movieService";
// import { useReducer,useEffect } from "react"


// // use react query or tan stack for reviwe also
// export default function useMovies(query,page=1){
//     const [state,dispatch]=useReducer(MovieReducer,{status:'idle',data:[],error:null});

//     useEffect(()=>{
//         let ignore=false;
//         dispatch({type:"LOADING"});
//         const fetchedMovie=async ()=>{
//             try{
//                 const movies=query?await SearchMovie(query):await Movie(page);
//                 if(!ignore){
//                     dispatch({
//                         type:"SUCCESS",
//                         payload:movies.results
//                     })
//                 }
//             }catch(err){
//                 if(!ignore){
//                     dispatch({
//                         type:'FAILURE',
//                         payload:err.message
//                     })
//                 }
//             }
//         }
//         fetchedMovie();
//         return()=>{
//             ignore=true;
//         }
//     },[query,page])
//     return state;
// }


import { useQuery } from "@tanstack/react-query";
import { Movie, SearchMovie } from "../service/movieService";


export default function useMovies(query, page = 1) {

    const {
        data,
        isLoading,
        error,
        isFetching
    } = useQuery({

        queryKey: ["movies", { query, page }],

        queryFn: async () => {

            const response = query
                ? await SearchMovie(query)
                : await Movie(page);

            return response.results;

        },

        // staleTime: 1000 * 60 * 5, // cache for 5 minutes
        placeholderData:(previous)=>previous,
    });

    return {
        movies: data ?? [],
        isLoading,
        isFetching,
        error
    };
}