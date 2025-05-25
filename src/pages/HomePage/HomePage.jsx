import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { getTrendingMoviesAsync } from "../../themoviedb-api";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const moviesFromAPI = await getTrendingMoviesAsync();
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
  }, []);

  return (
    <main>
      {error.length > 0 && !loading && <ErrorMessage message={error} />}
      {error.length === 0 && movies.length > 0 && !loading && (
        <MovieList movies={movies} />
      )}
      {loading && <Loader />}
    </main>
  );
};

export default HomePage;
