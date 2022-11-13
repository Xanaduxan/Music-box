/* eslint-disable jsx-a11y/label-has-associated-control */
const React = require('react');

const Layout = require('./Layout');

function Authentication({}) {
  return (
    <Layout>
      <main className="sign-form">
        <form className="form-authentification" method="POST" action="/authentication">

          <div className="form">
            <label htmlFor="loginInputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="loginInputEmail"
              name="email"
              placeholder="name@example.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="form">
            <label htmlFor="loginPassword">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="password"
              placeholder="Password"
              minLength="8"
              required
            />
          </div>
          <button type="submit" className="btn">Авторизоваться</button>
        </form>
      </main>
      <div className="invalid-feedback2" />
      <div className="invalid-feedback" />
      <script defer src="/js/authentication.js" />
    </Layout>
  );
}
module.exports = Authentication;
