const express = require('express');
const registerApi = require('./register');
const loginApi = require('./login');
const paymentApi = require('./payment');
const loginWithGoogleApi = require('./loginWithGoogle');
const userApi = require('./user');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(loginWithGoogleApi);
router.use(userApi);

module.exports = router;
