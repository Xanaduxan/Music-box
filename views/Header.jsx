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
              <a className="nav-link" href="/tracks/add">Добавить трек</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link" href="/playlists/add">Добавить плейлист</a>
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
      <link rel="stylesheet" href="/css/main.css" />
    </>
  );
}

module.exports = Header;
