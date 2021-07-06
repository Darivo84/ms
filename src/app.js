/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieSession = require('cookie-session');

require('./auth/passport');
require('./auth/passportGoogleSSO');

require('./models/user');

const passport = require('passport');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const whitelist = [
  'https://darivo84.github.io/gdxwebapp',
  'https://darivo84.github.io/micardwebapp',
  'https://darivo84.github.io/missowebapp',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ corsOptions, credentials: true }));
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
