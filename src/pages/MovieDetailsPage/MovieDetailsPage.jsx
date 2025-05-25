import { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, Outlet } from "react-router-dom";
import { getMovieDetailsAsync } from "../../themoviedb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { MdArrowBackIosNew } from "react-icons/md";
import css from "./MovieDetailsPage.module.css";

const substringBefore = (str, delimiter) => {
  let index = str.indexOf(delimiter);
  return index === -1 ? str : str.substring(0, index);
};

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const previousLocationRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const movieDetailsFromAPI = await getMovieDetailsAsync(movieId);
        setMovieDetails(movieDetailsFromAPI);
      } catch (error) {
        setError(
          `Oops... Something went wrong. The error encountered was: ${error.message}.`
        );
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <main>
      <Link
        to={previousLocationRef.current ?? "/movies"}
        className={css.goBackContainer}
      >
        <MdArrowBackIosNew className={css.icon} />
        <p className={css.linkText}>GO BACK</p>
      </Link>
      {error.length > 0 && !loading && <ErrorMessage message={error} />}
      {error.length === 0 && !loading && (
        <>
          <div className={css.infoBlock}>
            <div className={css.posterContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                width="500px"
                className={css.poster}
              />
            </div>
            <div className={css.infoText}>
              <section>
                <h1 className={css.title}>
                  {movieDetails.title}{" "}
                  {movieDetails.release_date &&
                    `(${substringBefore(movieDetails.release_date, "-")})`}
                </h1>
                <p className={css.description}>
                  User Score: {Math.round(movieDetails.vote_average * 10)}%
                </p>
              </section>
              <section>
                <h2 className={css.title}>Overview</h2>
                <p className={css.description}>{movieDetails.overview}</p>
              </section>
              <section>
                <h2 className={css.title}>Genres</h2>
                <ul>
                  {movieDetails.genres &&
                    movieDetails.genres.map((genre_i) => (
                      <li key={genre_i.id}>
                        <p className={css.description}>{genre_i.name}</p>
                      </li>
                    ))}
                </ul>
              </section>
            </div>
          </div>
          <hr className={css.divider} />
          <section>
            <h2 className={css.sectionTitle}>ADDITIONAL INFORMATION</h2>
            <ul className={css.additionalInfoOptions}>
              <li>
                <Link to="cast" className={css.link}>
                  CAST
                </Link>
              </li>
              <li>
                <Link to="reviews" className={css.link}>
                  REVIEWS
                </Link>
              </li>
            </ul>
          </section>
          <hr className={css.divider} />
          <Outlet />
        </>
      )}
      {loading && <Loader />}
    </main>
  );
};

export default MovieDetailsPage;
