const React = require('react');

function Header({ user }) {
  return (
    <>
      {user ? (
        <div className="header-container">
          <ul className="navbar">

            <li className="navbar-item">
              <a className="nav-link" href="/">Главная</a>
            </li>

            <li className="navbar-item">
              <a className="nav-link" href="/profile">Профиль</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link" href="/logout">Выйти</a>
            </li>

          </ul>
        </div>
      ) : (
        <div className="header-container">
          <ul className="navbar">

            <li className="navbar-item">
              <a className="nav-link" href="/registration">Регистрация</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link" href="/">Главная</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link" href="/authentication">Войти</a>
            </li>
          </ul>
        </div>
      )}
      <link rel="stylesheet" href="/css/headerStyle.css" />
    </>
  );
}

module.exports = Header;
