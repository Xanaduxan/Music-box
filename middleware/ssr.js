const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { User } = require('../db/models');

function renderComponent(reactComponent, props = {}, options = { doctype: true }) {
  const reactElement = React.createElement(reactComponent, {
    ...this.app.locals, // передать app.locals
    ...this.locals, // передать res.locals
    ...props, // передать пропсы
  });
  const html = ReactDOMServer.renderToStaticMarkup(reactElement);

  if (options.doctype) {
    this.write('<!DOCTYPE html>');
  }

  this.end(html);
}

function ssr(req, res, next) {
  res.renderComponent = renderComponent;
  next();
}

// промежуточная функция для очистки куки при истёкшей сессии на сервере
const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_uid && !req.session.userId) {
    res.clearCookie('user_uid');
    res.redirect('/');
  } else {
    next();
  }
};

// промежуточная функция проверки авторизированного пользователя
const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

// промежуточная функция наполнения локальных переменных
const resLocals = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
  }

  next();
};

// промежуточная функция поиска пользователя в БД по ID из сессии
const getUser = async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findByPk(Number(req.session.userId), { raw: true });
  }

  next();
};

module.exports = {
  ssr, cookiesCleaner, sessionChecker, resLocals, getUser,
};
