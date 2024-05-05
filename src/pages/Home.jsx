import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Layout from "./Layout.jsx";
import Card from "../components/Card.jsx";

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Card />
            <h1>va dans Movies :)</h1>
            <p>je n'ai pas pu beaucoup travailler j'ai eu un imprevu
                l'infinite scroll a été fait et j'ai compris comment utiliser l'api
            </p>

            <div className="hero">
                {/* Ici, vous pouvez ajouter d'autres éléments ou composants */}
            </div>
        </>
    );
};

export default Home;
