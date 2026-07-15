import MovieReducer from "../reducer/movieReducer";
import { seriesDiscovery } from "../service/movieService";
import { useReducer, useEffect } from "react";

export default function useSeries({ page = 1, genre, year, country, language } = {}) {
  const [state, dispatch] = useReducer(MovieReducer, { status: "idle", data: [], error: null });

  useEffect(() => {
    let ignore = false;
    dispatch({ type: "LOADING" });

    const fetchSeries = async () => {
      try {
        const result = await seriesDiscovery({ page, genre, year, country, language });
        if (!ignore) {
          dispatch({ type: "SUCCESS", payload: result.results });
        }
      } catch (err) {
        if (!ignore) {
          dispatch({ type: "FAILURE", payload: err.message });
        }
      }
    };

    fetchSeries();
    return () => {
      ignore = true;
    };
  }, [page, genre, year, country, language]);

  return state;
}