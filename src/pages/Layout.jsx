import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Layout = () => {
  // State pour détecter le défilement de la page
  const [isScrolled, setIsScrolled] = useState(false);
  // State pour afficher/masquer la barre de recherche
  const [showSearch, setShowSearch] = useState(false);
  // State pour stocker les résultats de recherche
  const [searchResults, setSearchResults] = useState([]);
  // State pour stocker le terme de recherche
  const [searchQuery, setSearchQuery] = useState("");

  // Effet pour détecter le défilement de la page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Liens de navigation
  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/Film" },
    { name: "TV Shows", link: "/Series" },
    { name: "My List", link: "/mylist" },
  ];

  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY; // Récupération de la clé API
      const response = await axios.get(`https://api.themoviedb.org/3${apiKey}/${searchQuery}`);
      setSearchResults(response.data.results || []); // Mise à jour des résultats de recherche
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
                    {/* Bouton de recherche (icône) */}
                    <button onFocus={() => setShowSearch(true)} onBlur={() => setShowSearch(false)}>
                      <FaSearch />
                    </button>
                    {/* Entrée de recherche */}
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={handleInputChange}
                      onKeyUp={handleInputKeyUp} // Gérer l'appui sur la touche "Entrée"
                      value={searchQuery}
                    />
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





