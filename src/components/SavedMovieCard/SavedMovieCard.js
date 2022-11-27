import React from "react";

import '../MoviesCard/MoviesCard.css';

function SavedMovieCard({film, nameRU, duration, img, handleMovieDelete}){
    
    function translationTime(num){
        const hour = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hour}ч ${minutes}м`;
    }

    return(
            <li className="films__item">
                <div className="films__wrapper">
                    <div className="films__info">
                        <h2 className="films__title">{nameRU}</h2>
                        <button type="button" onClick={() => handleMovieDelete(film._id)} className="films__del"></button>     

                    </div>
                    <p className="films__time">{translationTime(duration)}</p>    

                </div>
                <a href={film.trailerLink} target='_blank' rel="noreferrer">
                    <img src={`${img}`} alt="Фильм" className="films__img" />
                </a>
            </li>    
    );
}

export default SavedMovieCard;