import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Api from "../components/Api.js";

const Layout = () => {
  // State pour détecter le défilement de la page
  const [isScrolled, setIsScrolled] = useState(false);
  // State pour afficher/masquer la barre de recherche
  const [showSearch, setShowSearch] = useState(false);
  // State pour stocker les résultats de recherche
  const [searchResults, setSearchResults] = useState([]);
  // State pour stocker le terme de recherche
  const [searchQuery, setSearchQuery] = useState("");
  const api = new Api();

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
    
    {name: "Search", link: "/search"}
  ];

  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
      const response = await api.searchMovie(searchQuery, "en-US", 1, false); // Recherche de films
      console.log(response.results);
      setSearchResults(response.results || []); // Mise à jour des résultats de recherche
  };

  // Gérer le changement de valeur de l'entrée de recherche
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Gérer l'appui sur la touche "Entrée" dans le champ de saisie de recherche
  const handleInputKeyUp = async (event) => {
    if (event.key === "Enter") {
      await handleSearch(); // Lancer la recherche lorsque la touche "Entrée" est pressée
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
                  <div className={`search ${showSearch ? "show" : ""}`}>
                    {/* Bouton de recherche (icône) */}
                   
                    {/* Entrée de recherche */}
                
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
   
      {/* Composant enfant */}
      <Outlet/>
    </>
  );
};

export default Layout;





