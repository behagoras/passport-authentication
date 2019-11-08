module.exports = function(req, res, next) {
  const oldSend = res.send;

  res.send = function(data) {
    // eslint-disable-next-line no-param-reassign
    data.data.title = data.data.title.toLowerCase();
    // eslint-disable-next-line prefer-rest-params
    arguments[0] = JSON.stringify(data);
    res.set('Content-Type', 'application/json');
    oldSend.apply(res, [data]);
  };
  next();
};
