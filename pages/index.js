import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=d42687dd4fcc22554123c32436e6c838&language=en-US&page=1`
			);
			const data = await response.json();
			setMovies(data.results);
		};

		fetchMovies();
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Popular Movies</h1>
			<Link href="/search">
				<center>
					<button className={styles.searchButton}>Go to Search Page</button>
				</center>
				<br></br>
				<br></br>
			</Link>
			<div className={styles.movies}>
				{movies.map((movie) => (
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
				))}
			</div>
		</div>
	);
}
