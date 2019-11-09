module.exports = function (req, res, next) {
  if (req.method === 'POST') {
    req.body.title = req.body.title.toUpperCase();
  }

  next();
};
