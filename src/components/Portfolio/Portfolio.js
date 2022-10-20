import React from "react";

import arrow from '../../images/top-right-btn.svg';
import '../Portfolio/Portfolio.css';

function Portfolio(){
    return(
        <section className="portfolio">
            <div className="portfolio-wrapper">
                <h2 className="portfolio__title">
                    Портфолио
                </h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="https://github.com/KristinaZha/how-to-learn" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Статичный сайт  
                            </p>
                            <img src={arrow} alt="Кнопка стрелка" className="portfolio__btn" />
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/KristinaZha/russian-travel" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Адаптивный сайт  
                            </p>
                            <img src={arrow} alt="Кнопка стрелка" className="portfolio__btn" />
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/KristinaZha/react-mesto-api-full" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Одностраничное приложение  
                            </p>
                            <img src={arrow} alt="Кнопка стрелка" className="portfolio__btn" />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Portfolio;