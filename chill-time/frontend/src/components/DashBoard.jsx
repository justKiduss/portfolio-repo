// import TrendingMovies from "./trendingMovies";
// import PopularMovies from "./popularMovies";
// import ContinueWatching from "./continueWatching";

// export default function DashBoard(){   
//     return(
//         <>  
//             <ContinueWatching/>
//             <TrendingMovies/>
//             <PopularMovies/>
//         </>
//     )
// }


import TrendingMovies from "./trendingMovies";
import PopularMovies from "./popularMovies";
import ContinueWatching from "./continueWatching";

export default function DashBoard() {
  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen transition-colors">
      <ContinueWatching />
      <TrendingMovies />
      <PopularMovies />
    </div>
  );
}