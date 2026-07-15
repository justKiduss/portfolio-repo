import { useQuery } from "@tanstack/react-query";
import { Movie, SearchMovie } from "../service/movieService";

export default function useMovies({ query, page = 1, genre, year, country, language } = {}) {
  const filters = { query, page, genre, year, country, language };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["movies", filters],

    queryFn: async () => {
      const response = query
        ? await SearchMovie(query, page)
        : await Movie({ page, genre, year, country, language });

      return response.results;
    },

    placeholderData: (previous) => previous,
  });

  return {
    movies: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}