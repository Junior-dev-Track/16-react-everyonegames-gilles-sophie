import Api from "./Api.js";
import {useState} from "react";

export default function Card(key, movie) {

    const api = new Api();

    //console.log(movie)

    return (
        <div className="card" key={key}>
            <div className="card__img">
                {/**The img of the film**/}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            </div>
            <div className="card__title">
                {/**  A title*/}
            </div>
            <div className="card__hover__wrap">
                <div className="card__info">
                    <span className={"rating"}>
                        <p>Rating</p>

                    </span>
                    <span className={"age"}>
                    </span>
                    <span className={"date"}>
                    </span>
                    <span className={"duree"}>
                    </span>
                </div>
                <div className="card__tags">
                    <span>

                    </span>
                </div>
            </div>
        </div>
    )
}