const express = require('express');
const { register, login } = require('./User.controller');
const { validateUserLogin, validateUserRegisteration } = require('./User.middlewares');

const router = express.Router();

router.post('/register',validateUserRegisteration, register);
router.post('/login', validateUserLogin, login);

module.exports = router;