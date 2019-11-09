const express = require('express');

const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies');
const authApi = require('./routes/auth');

// const toUpperCase = require('./middlewares/toUppercase');
// const toLowerCase = require('./middlewares/toLowerCase');

// app.get('/year/:year2', (req, res) => {
//   const leapyear = year => {
//     return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
//   };
//   res.send(
//     leapyear(req.params.year2) ? 'El año es bisiesto' : 'El año no es bisiesto'
//   );
// });

app.use(express.json());
// app.use(toUpperCase);

authApi(app);
moviesApi(app);
userMoviesApi(app);

// app.use(logResponseBody);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
