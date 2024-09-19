import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d42687dd4fcc22554123c32436e6c838&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Search Results */}
      <div className={styles.movies}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className={styles.movieCard}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
                <h2 className={styles.movieTitle}>{movie.title}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
