/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
const express = require('express');
const User = require('../../models');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }

  const newUser = new User({ firstName, lastName, email, password });

  const savedUser = await newUser.save().catch((err) => {
    console.log('Error: ', err);
    res.status(500).json({ error: 'Cannot register user at the moment!' });
  });

  if (savedUser) res.json({ message: 'Thanks for registering' });
});

module.exports = router;
