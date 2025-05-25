import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWNhYWQzY2RmZDNlMjRmZDg0MzVmMTA4MTk3Y2UwNSIsIm5iZiI6MTYzMDQ5OTQ2Ni45NTYsInN1YiI6IjYxMmY3MjhhMmNlZmMyMDA4ZGM0OGNhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e6BWsK5blHQ7yC1nql3P5qJWizna-MelulFk9cK9OMI',
  },
};

export const getTrendingMoviesAsync = async () => {
  const response = await axios.get('/trending/movie/day', options);
  return response.data.results;
};

export const getMovieDetailsAsync = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCreditsAsync = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviewsAsync = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const getMoviesAsync = async (searchText) => {
  const response = await axios.get(
    `/search/movie?query=${searchText}`,
    options
  );
  return response.data.results;
};
