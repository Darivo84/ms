/* eslint-disable no-console */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable consistent-return */
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await user
    .findOne({ where: { email } })
    .catch((err) => {
      console.log('Error: ', err);
    });

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });

  if (userWithEmail.password !== password)
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: 'Welcome Back!', token: jwtToken });
});

module.exports = router;
