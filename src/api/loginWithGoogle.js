/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const express = require('express');
const passport = require('passport');
const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

const successLoginUrlGDX = 'https://darivo84.github.io/gdxwebapp/#/welcome';
const successLoginUrlMICard =
  'https://darivo84.github.io/micardwebapp/#/welcome';
const successLoginUrlMISSO = 'https://darivo84.github.io/missowebapp/#/welcome';
const errorLoginUrl = 'http://localhost:3000/error';

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    // successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    if (successLoginUrlGDX === true) {
      res.redirect(`${successLoginUrlGDX}/welcome`);
    } else if (successLoginUrlMICard === true) {
      res.redirect(`${successLoginUrlMICard}/welcome`);
    } else if (successLoginUrlMISSO === true) {
      res.redirect(`${successLoginUrlMISSO}/welcome`);
    }
    res.send('Thank you for signing in to MISSO!');
  }
);

module.exports = router;
