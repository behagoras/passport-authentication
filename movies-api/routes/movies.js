const express = require('express');
const MovieService = require('../services/movies');
// const toLowerCase = require('../middlewares/toLowerCase');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const movieService = new MovieService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await movieService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'Movies listed',
      });
    } catch (err) {
      next(err);
    }
  });
  router.get('/:movieId', async (req, res, next) => {
    // app.use(toLowerCase);
    const { movieId } = req.params;
    try {
      const movie = await movieService.getMovie({ movieId });
      // console.log(movie);
      next();
      res.status(200).send({
        data: movie,
        message: 'Movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  });
  router.post('/', async (req, res, next) => {
    const { body: movie } = req;
    try {
      // movie.title=movie.title.toUpperCase();
      const createdMovieId = await movieService.createMovie({ movie });
      res.status(201).json({
        data: createdMovieId,
        message: 'Movie created',
      });
    } catch (err) {
      next(err);
    }
  });
  router.put('/:movieId', async (req, res, next) => {
    const { body: movie } = req;
    const { movieId } = req.params;

    try {
      const updatedMovieId = await movieService.updateMovie({ movieId, movie });
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movies updated',
      });
    } catch (err) {
      next(err);
    }
  });
  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await movieService.deleteMovie({ movieId });
      res.status(200).json({
        data: deletedMovieId,
        message: 'Movies deleted',
      });
    } catch (err) {
      next(err);
    }
  });
  router.patch('/:movieId', async (req, res, next) => {
    const { body: movie } = req;
    const { movieId } = req.params;

    try {
      const patchedMovieId = await movieService.patchMovie({ movieId, movie });
      res.status(200).json({
        data: patchedMovieId,
        message: 'Movies patched',
      });
    } catch (err) {
      next(err);
    }
  });
}
module.exports = moviesApi;
