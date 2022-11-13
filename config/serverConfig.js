const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const sessionConfig = require('./sessionConfig');

const {
  cookiesCleaner, resLocals, getUser, ssr,
} = require('../middleware/ssr');

const config = (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(session(sessionConfig));

  app.use(resLocals);
  app.use(getUser);
  app.use(cookieParser());
  app.use(cookiesCleaner);
  app.use(ssr);
};

module.exports = config;
