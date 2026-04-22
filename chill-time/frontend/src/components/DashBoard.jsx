import ReviewReducer from "../reducer/reviewReducer"
import useMovies from "../hooks/useMovies"
import MovieList from "./movieList";
import useReview from "../hooks/useReview";
import { useEffect,useReducer } from "react";
import { useOutletContext } from "react-router-dom";
import TrendingMovies from "./trendingMovies";
import PopularMovies from "./popularMovies";
import ContinueWatching from "./continueWatching";

export default function DashBoard(){   
    return(
        <>  
            <ContinueWatching/>
            <TrendingMovies/>
            <PopularMovies/>
        </>
    )
}