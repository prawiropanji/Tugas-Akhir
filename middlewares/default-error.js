function handleDefaultError(err, req, res, next) {
  res.render('shared/errors/500');
  console.log(err);
}

module.exports = handleDefaultError;
