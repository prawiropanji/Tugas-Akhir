const express = require('express');

const authControllers = require('../controllers/authentication.controller');

const router = express.Router();

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.login);

router.get('/logout', authControllers.logout);

module.exports = router;
