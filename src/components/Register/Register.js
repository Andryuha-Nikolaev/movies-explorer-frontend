import React from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';

function Register() {
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin">
      <label className="form__field">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error">Что-то пошло не так...</span>
      </label>
      <label className="form__field">
        E-mail
        <input name="email" className="form__input" id="email-input" type="text" required />
        <span className="form__input-error">Что-то пошло не так...</span>
      </label>
      <label className="form__field">
        Пароль
        <input name="password" className="form__input" id="password-input" type="password" />
        <span className="form__input-error">Что-то пошло не так...</span>
      </label>
    </Form>
  );
}

export default Register;
