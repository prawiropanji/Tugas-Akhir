const express = require('express');
const router = express.Router();

router.get('/401', function (req, res, next) {
  res.status(401).render('shared/errors/401');
});

module.exports = router;
