const express = require('express');
const session = require('express-session');

const app = express();
const secret = 'banana potatoe';
const port = 3000;

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret,

}));

app.get('/', (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({
    hello: 'world',
    conter: req.session.count,
  });
});

app.listen(port, () => {
  console.log(`Listening app in http://localhost:${port}`); // eslint-disable-line no-console
});
