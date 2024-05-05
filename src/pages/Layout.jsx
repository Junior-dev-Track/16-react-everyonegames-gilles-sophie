import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Importer Axios pour effectuer des requêtes HTTP

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Stocker les résultats de la recherche
  const [searchQuery, setSearchQuery] = useState(""); // Stocker le terme de recherche

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Gérer le changement de position de défilement pour modifier l'état isScrolled
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événement lors de la suppression du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Liens de navigation
  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/Film" },
    { name: "TV Shows", link: "/series" },
    { name: "My List", link: "/mylist" },
  ];

  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    try {
      const apiKey = process.env.REACT_APP_IMDB_API_KEY;
      const response = await axios.get(`https://imdb-api.com/API/Search/${apiKey}/${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  
  

  // Gérer le changement de valeur de l'entrée de recherche
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Gérer l'appui sur la touche "Entrée" dans le champ de saisie de recherche
  const handleInputKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Lancer la recherche lorsque la touche "Entrée" est pressée
    }
  };

  return (
    <>
      {/* En-tête de la page */}
      <header>
        <nav className={isScrolled ? "scrolled" : ""}>
          <div className="content">
            <div className="sub-media">
              <div className="log">
                {/* Logo */}
                <img src="" alt="" />
                {/* Liens de navigation */}
                <div className="categories">
                  <ul className="links-flex">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.link}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Barre de recherche */}
              <div className="search">
                <div className="container">
                  <div className={`search ${showSearch ? "show-search" : ""}`}>
                    {/* Bouton de recherche */}
                    <button onFocus={() => setShowSearch(true)} onBlur={() => setShowSearch(false)}>
                      <FaSearch />
                    </button>
                    {/* Entrée de recherche */}
                    <input
                      type="text"
                      placeholder="Search"
                      onMouseEnter={() => setInputHover(true)}
                      onMouseLeave={() => setInputHover(false)}
                      onBlur={() => {
                        setShowSearch(false);
                        setInputHover(false);
                      }}
                      onChange={handleInputChange}
                      onKeyUp={handleInputKeyUp} // Gérer l'appui sur la touche "Entrée"
                      value={searchQuery}
                    />
                    {/* Bouton de recherche */}
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>
                {/* Boutons de connexion et de langues */}
                <button className="connexion-button">Connexion</button>
                <button className="language-button">Langues</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Affichage des résultats de la recherche */}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <img src={result.poster} alt={result.title} />
            <p>{result.title}</p>
          </div>
        ))}
      </div>
      {/* Composant enfant */}
      <Outlet />
    </>
  );
};

export default Layout;



