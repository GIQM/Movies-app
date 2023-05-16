const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMoviesGenres)

movieRouter.route('/:id/actors')
    .post(setMoviesActors)

movieRouter.route('/:id/directors')
    .post(setMoviesDirectors)
    
module.exports = movieRouter;