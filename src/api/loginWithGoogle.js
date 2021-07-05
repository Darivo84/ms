/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const express = require('express');
const passport = require('passport');
const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

const successLoginUrlGDX = 'http://localhost:3000';
const successLoginUrlMICard = 'http://localhost:3001';
const successLoginUrlMISSO = 'http://localhost:3002';
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
    // successRedirect: successLoginUrlGDX,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    if (successLoginUrlGDX) {
      res.redirect(`${successLoginUrlGDX}/welcome`);
    } else if (successLoginUrlMICard) {
      res.redirect(`${successLoginUrlMICard}/welcome`);
    } else if (successLoginUrlMISSO) {
      res.redirect(`${successLoginUrlMISSO}/welcome`);
    }
    res.send('Thank you for signing in to MISSO!');
  }
);

module.exports = router;
