import Api from "./Api.js";
import {useState} from "react";

export default function Card() {

    const api = new Api();

    const [card, setCard] = useState("")

    const popularMovies =  api.getPopularMovies("fr-FR",1)
    console.log(popularMovies)
    




    return (
        <div className="card">
            <div className="card__img">
                {/**The img of the film**/}
            </div>
            <div className="card__title">
               {/**  A title*/}
            </div>
            <div className="card__hover__wrap">
                <div className="card__info">
                    <span className={"rating"}>
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