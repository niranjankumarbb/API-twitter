const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.get('/users', userController.showTweets);

module.exports = router;