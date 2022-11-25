import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

import { shortMovieDuration, IMAGE_BASE_URL } from "../../utils/constants";

import api from '../../utils/MainApi';
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import '../Movies/Movies.css';

function Movies({
    addMovies,
    setAddMovies,
    handleMovieDelete,
    getSavedMovies})
    {
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [preloader, setPreloader] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('');

 function PutMovie(film){
    const img = `${IMAGE_BASE_URL}${film.image.url}`;
    const thumbnail = `${IMAGE_BASE_URL}${film.image.formats.thumbnail.url}`;
    api.createMovie( film.country,  film.director,  film.duration,  film.year, film.description, 
    img,  film.trailerLink,  thumbnail, film.owner, film.id, film.nameRU,  film.nameEN
        )
        .then((res) => {
            if(res){ setAddMovies([res, ...addMovies]); } 
             else 
              {
              return;
             }      
            })
         .catch((err) => {
          console.log(err);
           })
    };

    function filterOutMovie(films){
        const filterMovie = films.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(searchInput);
        });
        const localCheckbox = localStorage.getItem('checkbox');
        const localCheckboxParse = JSON.parse(localCheckbox);
            if(filterMovie.length === 0){
            setPreloader(false);
            setError('Упс...Повторите поиск');
            return;
        } else {
            if(localCheckboxParse){
                const filteredByDuration =    filterMovie.filter((movie) => {
                    return movie.duration <= shortMovieDuration;
                });

                if(filteredByDuration.length === 0){
                    setError('Ничего не найдено');
                    return; 
                } else{
                    setMovies(filteredByDuration);
                    localStorage.setItem('filterMovies', JSON.stringify(filteredByDuration));
                }
                
            } else{
                setMovies(   filterMovie);
                localStorage.setItem('filterMovies', JSON.stringify(   filterMovie)); 
            };    
        };
    };

    function handleSubmit(event){
        event.preventDefault();
        setMovies([]);
        setPreloader(true);
        if(searchInput === '' || searchInput === null){
            setPreloader(false);
            setError('Введите название фильма для поиска');
            return;
        } else {
            localStorage.setItem('   searchInput',    searchInput);
            setError('');
                if(JSON.parse(localStorage.getItem('movies'))){
                setPreloader(false);
                const localFilms = localStorage.getItem('movies');
                const localFilmsParse = JSON.parse(localFilms);
                filterOutMovie(localFilmsParse);
            } else{
                moviesApi.getMovies()
                    .then(movies => {
                        localStorage.setItem('movies', JSON.stringify(movies));
                        filterOutMovie(movies);
                    })
                    .finally(() => setPreloader(false))
                    .catch(() => {
                        setError('Ничего не найдено');
                    })
            };
        };
    };

    useEffect(() => {
        setPreloader(false);
        getSavedMovies();
        const searchMovies = localStorage.getItem('filterMovies');
        const searchMoviesParse = JSON.parse(searchMovies);
        const localShortMovies = localStorage.getItem('filterMoviesByDuration');
        const localShortMoviesParse = JSON.parse(localShortMovies);
        const localCheckbox = localStorage.getItem('checkbox');
        const localCheckboxParse = JSON.parse(localCheckbox);
        if(searchMoviesParse){
            if(localCheckboxParse){
                if(localShortMoviesParse){
                    setMovies(localShortMoviesParse);
                } else {
                    setMovies(searchMoviesParse)
                }
            } else {
               setMovies(searchMoviesParse); 
            }
        } else{
            setError('Начните первый поиск нужных вам фильмов');
        }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
    setError('');
        const searchMovies = localStorage.getItem('filterMovies');
        const searchMoviesParse = JSON.parse(searchMovies);
        const localCheckbox = localStorage.getItem('checkbox');
        const localCheckboxParse = JSON.parse(localCheckbox);
            if(   searchMoviesParse){
             if(localCheckboxParse === true){
                setCheckbox(true);
                const filteredByDuration =    searchMoviesParse.filter((movie) => {
                    return movie.duration <= shortMovieDuration;
                });
                    if(filteredByDuration.length === 0){
                    setMovies([]);
                    setError('Ничего не найдено');
                    return; 
                } else{
                    setMovies(filteredByDuration);
                    localStorage.setItem('filterMoviesByDuration', JSON.stringify(filteredByDuration));
                }
            } else if(localCheckboxParse === false){
                setCheckbox(false);
                setMovies(   searchMoviesParse);
            }

        } else{
            return;
        }

    }, [checkbox]);

    return (
        <>
            <SearchForm locationMovies={location.pathname} handleSubmit={handleSubmit} setSearchInput={setSearchInput} setCheckbox={setCheckbox}/> <span className="server">{error || ''}</span>
            { preloader ? <Preloader />  :
             <MoviesCardList  movies={movies} addMovies={addMovies} setAddMovies={setAddMovies} PutMovie={PutMovie} handleMovieDelete={handleMovieDelete}/>
            }
        </>
    );
}

export default Movies;