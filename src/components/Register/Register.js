import React, { useState } from "react";
import {  Link } from "react-router-dom";


import { regExpEmail, regExpName } from "../../utils/constants";


import logo from '../../images/logo.svg'
import '../Register/Register.css';

function Register(props){

    const [registerError, setRegisterError] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [state, setState] = useState({
        email: "",
        password: "",
        name:""
      });

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setState({...state, [name] : value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest('form').checkValidity());
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        let { name,email, password } = state;
        props.handleRegister(name, email, password)
        .catch((err) => {
            console.log(err);
            setRegisterError('Произошла ошибка регистрации. Пройдите регистрацию заново');
        });
      }

 

    return(
        <section className="user-auth">
            <Link exact to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Добро пожаловать!
                </h1>
                <form id="register" onSubmit={handleSubmit} className="user-auth__form" noValidate>
                    <label className="user-auth__name-input">
                        Имя

                        <input 
                            type="text"
                            id="name" 
                            name="name" 
                            value={state.name} 
                            onChange={handleChange} 
                            minLength='2' 
                            maxLength='40'
                            pattern={regExpName}
                            placeholder="Введите имя" 
                            className={`user-auth__input ${errors.name ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            className="validation-error_active"
                            id="name-error"
                        >
                            {errors.name || ''}
                        </span>
                    </label>
                    <label className="user-auth__name-input">
                        E-mail

                        <input 
                            type="email" 
                            name="email" 
                            value={state.email} 
                            onChange={handleChange}
                            pattern={regExpEmail}
                            placeholder='Введите E-mail' 
                            className={`user-auth__input ${errors.email ? 'user-auth__input_error' : 'user-auth__input_green'}`} 
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            className="validation-error_active"
                            id="email-error"
                        >
                            {errors.email || ''}
                        </span>
                    </label>
                    <label className="user-auth__name-input">
                        Пароль

                        <input 
                            type="password" 
                            name="password" 
                            value={state.password} 
                            onChange={handleChange} 
                            placeholder='Введите пароль' 
                            className={`user-auth__input ${errors.password ? 'user-auth__input_error' : 'user-auth__input_green' }`}
                            autoComplete="off" 
                            required={true}
                        />
                        <span 
                            className="validation-error_active"
                            id="password-error"
                        >
                            {errors.password || ''}
                        </span>
                    </label>
                    
                </form>
                <span 
                    className="register-error"
                >
                    {registerError || ''}
                </span>
                <button form="register" type="submit" className={`user-auth__btn ${isValid ? '' : 'user-auth__btn_disabled'}`} disabled={isValid ? false : true}>Зарегистрироваться</button>
                <div className="user-auth__link-wrapper">
                    <p className="user-auth__link-text">
                        Уже зарегистрированы?
                    </p>
                    <Link to="/signin" className="user-auth__link">
                        Войти
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Register;