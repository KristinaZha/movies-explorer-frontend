import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import { shortMovieDuration } from "../../utils/constants";

import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesList/SavedMoviesList";

import '../Movies/Movies.css';

function SavedMovies({ addMovies, setAddMovies, handleMovieDelete, getSavedMovies }){

//Используется для отображения информации компонента с поиском фильмов согласно страницам, где он находится
  const location = useLocation();

//Стейт перменная введенных в строку поика данных
  const [   searchInput,    setSearchInput] = useState('');

//Стейт переменная чекбокса
  const [checkbox, setCheckbox] = useState(false);

//Стейт переменная ошибок
  const [error, setError] = useState('');

//Сортировка фильмов
  function    filterOutMovie(films){
    const    filterMovie = films.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(   searchInput);
    });
    
    if(   filterMovie.length === 0){
      setError('Ничего не найдено');
      return;
    } else{
        if(checkbox){
          const filteredByDuration = filterMovie.filter((movie) => {
              return movie.duration <= shortMovieDuration;
          });

          if(filteredByDuration.length === 0){
            setError('Ничего не найдено');
            return;
          } else{
            setAddMovies(filteredByDuration);  
          }
        } else{
            setAddMovies(   filterMovie);
        };  
    };
  };

//Отправка формы поиска фильмов
  function handleSubmit(e){
    e.preventDefault();

    setAddMovies([]);
    
    if(   searchInput === '' ||    searchInput === null){
        setError('Нужно ввести ключевое слово');
    } else {
        setError('');
        if(addMovies === []){
          setError('Вы ещё не сохранили ни одного фильма');
        } else{
             filterOutMovie(addMovies);
        }
    };
  };

  useEffect(() => {
    getSavedMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(checkbox){
      const filteredByDuration = addMovies.filter((movie) => {
          return movie.duration <= shortMovieDuration;
      });

      if(filteredByDuration.length === 0){
          setError('Ничего не найдено');
          return; 
      } else{
          setAddMovies(filteredByDuration);
      }
  } else{
      getSavedMovies();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [checkbox])

    return(
        <>
            <SearchForm
              handleSubmit={handleSubmit}
                 setSearchInput={   setSearchInput}
              setCheckbox={setCheckbox} 
              locationSavedMovies={location.pathname}
            />

            <span className="server">{error || ''}</span>

            <SavedMoviesCardList addMovies={addMovies} handleMovieDelete={handleMovieDelete} />
        </>
    );
}

export default SavedMovies;