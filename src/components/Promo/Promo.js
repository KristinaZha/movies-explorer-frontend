import React from "react";

import web from '../../images/picture-web.svg';
import '../Promo/Promo.css';

function Promo(){
    return(
        <section className="main-page">
            <div className="main-page__wrapper">
                <div className="main-page__info">
                    <h1 className="main-page__title">
                        Учебный проект студента факультета Веб-разработки.
                    </h1>
                   
                </div>
                <img src={web} alt="Спираль" className="main-page__img" />
            </div>
           
        </section>
    );
}

export default Promo;