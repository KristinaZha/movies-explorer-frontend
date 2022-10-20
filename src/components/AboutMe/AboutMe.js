import React from "react";

import avatar from '../../images/avatar.jpg'
import './AboutMe.css';

function AboutMe(){
    return(
        <section className="profile">
            <h2 className="section-title">
                Студент
            </h2>
            <div className="profile__wrapper">
                <div className="profile__info">
                    <h1 className="profile__name">
                        Кристина
                    </h1>
                    <p className="profile__short-desc">
                        Фронтенд-разработчик, 32 года
                    </p>
                    <p className="profile__desc">
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.  </p>
                    <div className="profile__links">
                       
                        <a href="https://github.com" target='_blank' rel="noreferrer" className="profile__link">
                            Github
                        </a>
                    </div>
                </div>
                <img src={avatar} alt="Фото студента" className="profile__avatar" />
            </div>
        </section>
    );
}

export default AboutMe;