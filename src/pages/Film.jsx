import React, { useState, useEffect } from "react";


const API_KEY = "ef395594fb7732a80f87fba271290c54";

const Film = () => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [fetchedMovieIds, setFetchedMovieIds] = useState(new Set());

    const getMovie = (pageNum) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNum}`)
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

    return (
        <div className="film-container"> {/* Ajoutez la classe pour la grille */}
            {movieList.map((movie, index) => (
                <div key={index} className="film-item"> {/* Ajoutez la classe pour chaque film */}
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="film-details">
                        <h3>{movie.title}</h3>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        {/* Ajoutez d'autres informations du film ici */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Film;




