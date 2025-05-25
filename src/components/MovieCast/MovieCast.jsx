import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCreditsAsync } from "../../themoviedb-api";
import css from "./MovieCast.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        setLoading(true);
        setError("");
        const movieCreditsFromAPI = await getMovieCreditsAsync(movieId);
        setMovieCredits(movieCreditsFromAPI);
      } catch (error) {
        setError(
          `Oops... Something went wrong. The error encountered was: ${error.message}.`
        );
      } finally {
        setLoading(false);
      }
    };

    getMovieCredits();
  }, [movieId]);

  return (
    <>
      {error.length > 0 && !loading && <ErrorMessage message={error} />}
      {error.length === 0 && movieCredits.length === 0 && !loading ? (
        <ErrorMessage
          message={
            "We don't have any information about the cast of this movie."
          }
        />
      ) : (
        <ul className={css.castList}>
          {movieCredits.map((movieCredit_i) => (
            <li key={movieCredit_i.id} className={css.creditContainer}>
              <div className={css.posterContainer}>
                {movieCredit_i.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieCredit_i.profile_path}`}
                    alt={movieCredit_i.name}
                    className={css.poster}
                  />
                )}
              </div>
              <p>
                {movieCredit_i.name}
                <br />
                as
                <br />
                <span className={css.boldText}>{movieCredit_i.character}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      {loading && <Loader />}
    </>
  );
};

export default MovieCast;
