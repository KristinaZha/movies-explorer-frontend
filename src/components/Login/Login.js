import React, {useState} from "react";
import { Link } from "react-router-dom";
import { regExpEmail } from "../../utils/constants";
import logo from '../../images/logo.svg';
import '../Login/Login.css';

function Login(props){
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [serverError, setServerError] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

  function handleChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name] : value});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValid(target.closest('form').checkValidity());
  }

   
    function handleSubmit(e){
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        props.handleLogin(values.email, values.password)
       .catch((err) => {
        console.log(err);
        setServerError('Произошла ошибка. Повторите запрос.');
       })
    };
   
    return(
        <section className="user-auth">
            <Link to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Рады видеть!
                </h1>
                <form id="login" className="user-auth__form" onSubmit={handleSubmit} noValidate>
                    <label className="user-auth__name-input">
                        E-mail

                        <input 
                            type="email" 
                            name="email"
                            id="email" 
                            value={values.email || ''} 
                            onChange={handleChange}
                            pattern={regExpEmail} 
                            placeholder='Введите E-mail' 
                            className={`user-auth__input ${errors.email ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />
                        
                        <span 
                            id="email-error" 
                            className="validation-error_active"  
                        >
                            {errors.email || ''}
                        </span>    
                    </label>
                    <label className="user-auth__name-input">
                        Пароль

                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            value={values.password || ''} 
                            onChange={handleChange} 
                            placeholder='Введите пароль' 
                            className={`user-auth__input ${errors.password ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            id="password-error" 
                            className="validation-error_active"
                        >
                            {errors.password || ''}
                        </span>    
                    </label>
                </form>
                <span className="server">{serverError}</span>
                <button form="login" type="submit" className={`user-auth__btn ${isValid ? '' : 'user-auth__btn_disabled'}`} disabled={isValid ? false : true}>Войти</button>
                <div className="user-auth__link-wrapper">
                    <p className="user-auth__link-text">
                        Ещё не зарегистрированы?
                    </p>
                    <Link to="/signup" className="user-auth__link">
                        Регистрация
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Login;