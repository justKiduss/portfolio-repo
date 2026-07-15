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