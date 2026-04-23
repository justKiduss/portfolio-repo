export default function Streaming({movie,movieId}){
    const src= `https://vsembed.ru/embed/movie/${movieId}`;
    return(

        <div className="max-w-5xl mx-auto p-4 space-y-6">

        {/* Video Section */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow">
                  <iframe src={src} title="Movie Player" className="w-full h-full" allowFullScreen/>
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