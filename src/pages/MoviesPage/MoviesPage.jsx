import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesAsync } from "../../themoviedb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";

const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      if (!query || query.length === 0) return;
      try {
        setLoading(true);
        setError("");
        const moviesFromAPI = await getMoviesAsync(query);
        setMovies(moviesFromAPI);
      } catch (error) {
        setError(
          `Oops... Something went wrong. The error encountered was: ${error.message}.`
        );
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, [query]);

  const updateSearchText = (newSearchText) => {
    setSearchParams({ query: newSearchText });
  };

  return (
    <main>
      <SearchBar oldValue={query} callbackOnSubmit={updateSearchText} />
      {error.length > 0 && !loading && <ErrorMessage message={error} />}
      {error.length === 0 && movies.length > 0 && !loading && (
        <MovieList movies={movies} />
      )}
      {loading && <Loader />}
    </main>
  );
};

export default MoviesPage;
