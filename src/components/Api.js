class Api {

    constructor() {
        this.key = import.meta.env.VITE_APP_API_KEY;
        this.option = {//"&api_key=3e5b29a83810b6baa1f34af69101db45"
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.key}`
            }
    }}

    #apiConnexion = (path) => {
        return fetch(`https://api.themoviedb.org/3/${path}`, this.option)
                .then(response => response.json())
                .catch(err => console.error(err));
    };

    //GET configuration

    /**
     * Get all the languages
     */
    getLanguages = () => {
        return this.#apiConnexion("configuration/languages");
    }

    //GET popular

    /**
     * Get the popular movies
     * @param lang {string} - The language of the movies
     * @param page {number} - The page number
     * @param region {string} - The region of the movies in ISO 3166-1
     */
    getPopularMovies = (lang, page = 0, region = "") => {
        return this.#apiConnexion(`movie/popular?${lang}${page === 0 ? '' : `&page=${page}`}${region === "" ? '' : `&region=${region}`}`);
    };

    /**
     * Get the popular series
     * @param lang {string} - The language of the series
     * @param page {number} - The page number
     */
    getPopularSeries = (lang, page = 0) => {
        return this.#apiConnexion(`tv/popular?${lang}${page === 0 ? '' : `&page=${page}`}`);
    }


    //GET by ID

    /**
     * Get movie by id
     * @param id {number} - The id of the movie
     * @param lang {string} - The language of the movie
     * @param append {Array} - The append to response
     */
    getMovieById = (id,lang,append=[""]) => {
        return this.#apiConnexion(`movie/${id}?language=${lang}${append===[""] ? '' : `&append_to_response=${append.join(',')}`}`);
    }

    /**
     * Get serie by id
     * @param id {number} - The id of the serie
     * @param lang {string} - The language of the serie
     * @param append {Array} - The append to response
     */
    getSerieById = (id,lang,append=[""]) => {
        return this.#apiConnexion(`tv/${id}?language=${lang}${append===[""] ? '' : `&append_to_response=${append.join(',')}`}`);
    }

    //GET search

    /**
     * Search for a movie
     * @param query {string} - The query to search
     * @param lang {string} - The language of the movie
     * @param page {number} - The page number
     * @param includeAdult {boolean} - Include adult content
     */
    searchMovie = (query, lang,page = 0,includeAdult = false) => {
        return this.#apiConnexion(`search/multi?query=${query}&include_adult=${includeAdult}&language=${lang}${page === 0 ? '1' : `&page=${page}`}`);
    }

    //GET discover
    /**
     * Discover movies
     * @param lang {string} - The language of the movies
     * @param page {number} - The page number
     */
    discoverMovies = (lang,page = 0) => {
        return this.#apiConnexion(`discover/movie?language=${lang}${page === 0 ? '' : `&page=${page}`}`);
    }
}

export default Api;