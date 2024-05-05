import Card from "../components/Card.jsx";
import React, { useState, useEffect } from "react";
{/**import backgroundimage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitlle.webp";**/}
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Layout from "./Layout.jsx";
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
            {/**<Card />**/}
           
            <h1>Home</h1>

            <div className="hero">
                <img src={backgroundImage} alt="background" 
                className="background-image"/>

                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="button-flex">
                        <button className="flex-j-center a-center"></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;