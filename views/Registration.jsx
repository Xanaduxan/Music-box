const React = require('react');
const Layout = require('./Layout');

function Registration() {
  return (
    <Layout>
      <div className="container">
        <form className="regForm" method="POST" action="/registration">
          <div className="mb-3">
            <label htmlFor="exampleInputLogin" className="form-label">Имя</label>
            <input type="text" name="name" className="form-control" id="exampleInputLogin" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">Подтверждение пароля</label>
            <input type="password" name="passwordconf" className="form-control" id="exampleInputPassword" />
          </div>

          <div id="confirm" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <script defer src="/js/registration.js" />
    </Layout>
  );
}
module.exports = Registration;
