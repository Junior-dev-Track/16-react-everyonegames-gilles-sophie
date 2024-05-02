import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur de défilement lors de la suppression du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
    { name: "TV Shows", link: "/series" },
    { name: "My List", link: "/mylist" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  return (
    <>
      <header>
        <nav className={isScrolled ? "scrolled" : ""}>
          <div className="content">
            <div className="sub-media">
              <div className="log">
                {/**logo */}
                <img src="" alt="" />
                <div className="categories">
                  <ul className="links-flex">
                    {links.map((link) => {
                      return (
                        <li key={link.name}>
                          <Link to={link.link}>{link.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="search">
                <div className="container">
                  <div
                    className={`search ${
                      showSearch ? "show-search" : ""
                    }`}
                  >
                    <button
                      onFocus={() => setShowSearch(true)}
                      onBlur={() => {
                        if (!inputHover) setShowSearch(false);
                      }}
                    >
                      <FaSearch />
                    </button>
                    <input
                      type="text"
                      placeholder="Search"
                      onMouseEnter={() => setInputHover(true)}
                      onMouseLeave={() => setInputHover(false)}
                      onBlur={() => {
                        setShowSearch(false);
                        setInputHover(false);
                      }}
                    />
                  </div>
                </div>

                <button className="connexion-button">Connexion</button>
                <button className="language-button">Langue</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
