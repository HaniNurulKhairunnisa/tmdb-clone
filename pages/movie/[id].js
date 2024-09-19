import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d42687dd4fcc22554123c32436e6c838&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <div className={styles.movieDetail}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImage}
        />
        <div className={styles.movieInfo}>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Release Date: {movie.release_date}</h3>
          <h3>Rating: {movie.vote_average}</h3>
        </div>
      </div>
    </div>
  );
}
