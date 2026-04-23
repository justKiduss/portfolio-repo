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