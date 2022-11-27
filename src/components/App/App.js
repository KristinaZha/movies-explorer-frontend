import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import HeaderAfterAuth from '../HeaderAfterAuth/HeaderAfterAuth';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import './App.css';

function App() {
  const [currentUser, setCurrentUser ] = useState({});
  const [addMovies, setAddMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [preloader, setPreloader] = useState(true); 
  const history = useHistory();

  
//Регистрация пользователя
function handleRegister ( email, password,name) {
  return auth.register( email, password,name)
  .then((data) => {
    if (!data.token) {
           console.log('Проверьте данные');
    }
      history.push("/signin");    
  })
      .catch((err) => console.log(err));
};

function handleLogin(email,password){
  return auth.authorize(email,password)
  .then((data) => {
      if(!data.token){
          console.log()
        } 
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push("/movies");    
        })
  .catch((err) => {
   console.log(err)
})
};
 
 function getSavedMovies(){
  api.getMovies()
      .then(res => {
        if(res) {
          const userMovies = res.filter((movie) => movie.owner === currentUser._id);
          setAddMovies(userMovies);
        } 
      })
      .catch((err) => {
          console.log(err);
      })
}

  function handleMovieDelete(id) {
    api.deleteMovie(id)
      .then((movie) => {
        if(movie){
          setAddMovies((state) => state.filter((m) => m.id === m.movieId ? movie.remove() : m ));
          getSavedMovies(); 
        } else {
          return;
        }
      })
      .catch(err => console.log(err));
  };

  function handleSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/");
  };

  function getUserInfo(){
    api.getProfile()
    .then(user => {
      if(user){
        setCurrentUser(user);
      }
    })
    .catch((err) => {
        console.log(err);
    })
  };
  
    function checkToken() {
      let jwt = localStorage.getItem('jwt');
      if(jwt) {
        auth.getContent(jwt)
          .then((res) => {
            if(res.name && res.email){
              setLoggedIn(true);
            }
          })
          .finally(() => {
            setPreloader(false);
          })
          .catch((err) => {
            console.log(err);
          })   
      }
    };

  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    if(loggedIn){
      getUserInfo();
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
             <Route exact path="/">{loggedIn ? <HeaderAfterAuth /> : <Header />}
              <Main />
              <Footer />
            </Route>

            <Route path="/signup">
              <Register  handleRegister={handleRegister} setLoggedIn={setLoggedIn}
              />
            </Route>

            <Route path="/signin">
              <Login
               handleLogin={handleLogin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}
              />
            </Route>            

            { preloader  ? <Preloader /> :
              <>
                <ProtectedRoute path="/movies" loggedIn={loggedIn}>
                  <HeaderAfterAuth />
                  <Movies addMovies={addMovies} setAddMovies={setAddMovies} handleMovieDelete={handleMovieDelete} getSavedMovies={getSavedMovies}
                  />
                  <Footer />
                </ProtectedRoute> 

                <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                  <HeaderAfterAuth />
                  <SavedMovies addMovies={addMovies} setAddMovies={setAddMovies}  handleMovieDelete={handleMovieDelete} currentUser={currentUser} getSavedMovies={getSavedMovies}
                  />
                  <Footer />
                </ProtectedRoute>

                <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                  <HeaderAfterAuth />
                  <Profile setCurrentUser={setCurrentUser} handleSignOut={handleSignOut} />
                </ProtectedRoute> </> }
            <Route path='*'>
                <PageNotFound />
              </Route>
          </Switch>

        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;