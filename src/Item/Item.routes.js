const express = require('express');
const { isAuthenticated } = require('../User/User.middlewares');
const { addItem, updateTodo } = require('./Item.controller');

const router = express.Router();

router.post('/add', isAuthenticated, addItem);
router.patch('/update', isAuthenticated, updateTodo)

module.exports = router;