import React, { useState, useEffect } from "react";

const API_KEY = "ef395594fb7732a80f87fba271290c54";

const Series = () => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [fetchedMovieIds, setFetchedMovieIds] = useState(new Set());

    const getMovie = (pageNum) => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${pageNum}`)
            .then(res => res.json())
            .then(json => {
                // Filter out movies whose IDs are already fetched
                const newMovies = json.results.filter(movie => !fetchedMovieIds.has(movie.id));
                // Add new movie IDs to fetchedMovieIds set
                newMovies.forEach(movie => fetchedMovieIds.add(movie.id));
                setMovieList(prevMovies => [...prevMovies, ...newMovies]);
            });
    };

    useEffect(() => {
        getMovie(page);
    }, [page]);

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                setPage(prevPage => prevPage + 1);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchedMovieIds]); // Trigger when new movies are fetched

    // Ajouter l'état pour suivre si le film est déroulé ou réduit
    const [expandedMovieId, setExpandedMovieId] = useState(null);

    // Fonction pour basculer entre l'état déroulé et réduit d'un film
    const toggleMovieOverview = (movieId) => {
        setExpandedMovieId(prevId => (prevId === movieId ? null : movieId));
    };

    return (
        <div className="film-container">
            {movieList.map((movie, index) => (
                <div key={index} className="film-item">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="film-details">
                        <h3>{movie.name}</h3>
                        <p>Release Date: {movie.first_air_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        {expandedMovieId === movie.id ? (
                            <div>
                                <p>{movie.overview}</p>
                                <button onClick={() => toggleMovieOverview(movie.id)}>Less</button>
                            </div>
                        ) : (
                            <button onClick={() => toggleMovieOverview(movie.id)}>More</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Series;




