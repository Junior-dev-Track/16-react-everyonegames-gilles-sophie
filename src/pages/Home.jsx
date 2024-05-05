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
            <h1>Home ici</h1>

            <div className="hero">
                {/* Ici, vous pouvez ajouter d'autres éléments ou composants */}
            </div>
        </>
    );
};

export default Home;
