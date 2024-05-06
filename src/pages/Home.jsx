import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";

const API_KEY = "ef395594fb7732a80f87fba271290c54";

const Home = () => {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [fetchedMovieIds, setFetchedMovieIds] = useState(new Set());
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
    const [autoplayInterval, setAutoplayInterval] = useState(null);

    useEffect(() => {
        getMovies(page);
    }, [page]);

    useEffect(() => {
        if (movieList.length > 0 && !autoplayInterval) {
            startAutoplay();
        }
    }, [movieList, autoplayInterval]);

    const getMovies = async (pageNum) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageNum}`);
            const newMovies = response.data.results.filter(movie => !fetchedMovieIds.has(movie.id));
            newMovies.forEach(movie => fetchedMovieIds.add(movie.id));
            setMovieList(prevMovies => [...prevMovies, ...newMovies]);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const startAutoplay = () => {
        const interval = setInterval(() => {
            setSelectedMovieIndex(prevIndex => (prevIndex + 1) % movieList.length);
        }, 5000);
        setAutoplayInterval(interval);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        setAutoplayInterval(null);
        startAutoplay();
    };

    return (
        <div>
            {movieList.length > 0 && (
                <div className="banner">
                    <img src={`https://image.tmdb.org/t/p/w500/${movieList[selectedMovieIndex].poster_path}`} alt={movieList[selectedMovieIndex].title} className="banner-image" />
                    <div className="details">
                        <h4 className="title">{movieList[selectedMovieIndex].title}</h4>
                        <p>{movieList[selectedMovieIndex].overview}</p>
                        <div className="button">
                            <a href={`#/${movieList[selectedMovieIndex].id}`}>More <AiOutlineInfoCircle /></a>
                            <a href={`#/${movieList[selectedMovieIndex].id}`}>Watch Trailer <FaPlay /></a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;









