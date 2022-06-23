const express = require('express');

const baseControllers = require('../controllers/base.controller');

const router = express.Router();

router.get('/', baseControllers.redirectHomePage);

router.get('/home', baseControllers.getLandingPage);

module.exports = router;
