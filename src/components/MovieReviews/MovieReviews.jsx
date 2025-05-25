import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviewsAsync } from "../../themoviedb-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        setError("");
        const movieReviewsFromAPI = await getMovieReviewsAsync(movieId);
        setMovieReviews(movieReviewsFromAPI);
      } catch (error) {
        setError(
          `Oops... Something went wrong. The error encountered was: ${error.message}.`
        );
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {error.length > 0 && !loading && <ErrorMessage message={error} />}

      {error.length === 0 && !loading && movieReviews.length === 0 ? (
        <ErrorMessage message={"We don't have any reviews for this movie."} />
      ) : (
        <ul className={css.reviewsContainer}>
          {movieReviews.map((movieReview_i) => (
            <li key={movieReview_i.id} className={css.reviewItem}>
              <p className={css.boldText}>Author: {movieReview_i.author}</p>
              <p>{movieReview_i.content}</p>
            </li>
          ))}
        </ul>
      )}

      {loading && <Loader />}
    </>
  );
};

export default MovieReviews;
