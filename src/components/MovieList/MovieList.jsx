import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.moviesContainer}>
      {movies.map((movie_i) => (
        <li key={movie_i.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie_i.id}`}
            state={location}
            className={css.movieLink}
          >
            {movie_i.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
