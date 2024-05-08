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
    const [isLoading, setIsLoading] = useState(true); // Ajout de l'état isLoading

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
            setIsLoading(false); // Marquer le chargement comme terminé
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
            {isLoading ? ( // Afficher le loader si isLoading est true
                <div>
                    <div className="box-of-star1">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star2">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star3">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div className="box-of-star4">
                        <div className="star star-position1"></div>
                        <div className="star star-position2"></div>
                        <div className="star star-position3"></div>
                        <div className="star star-position4"></div>
                        <div className="star star-position5"></div>
                        <div className="star star-position6"></div>
                        <div className="star star-position7"></div>
                    </div>
                    <div data-js="astro" className="astronaut">
                        <div className="head"></div>
                        <div className="arm arm-left"></div>
                        <div className="arm arm-right"></div>
                        <div className="body">
                            <div className="panel"></div>
                        </div>
                        <div className="leg leg-left"></div>
                        <div className="leg leg-right"></div>
                        <div className="schoolbag"></div>
                    </div>
                </div>
            ) : ( // Sinon, afficher le contenu normal
                movieList.length > 0 && (
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
                )
            )}
        </div>
    );
};

export default Home;










