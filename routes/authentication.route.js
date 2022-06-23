const express = require('express');

const authControllers = require('../controllers/authentication.controller');

const router = express.Router();

router.get('/', authControllers.getLoginPage); // /login

router.post('/', authControllers.login); // /login

module.exports = router;
