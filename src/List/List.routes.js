const express = require('express');
const { isAuthenticated } = require('../User/User.middlewares');
const { getUserList } = require('./List.controller');

const router = express.Router();

router.get('/find', isAuthenticated, getUserList)

module.exports = router;