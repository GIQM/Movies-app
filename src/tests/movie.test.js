const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models');

let moviesId;

test('POST /movies', async () => {
    const movies = {
        name: "Fuerza Delta",
        image: "https://mi-imagen.jpg",
        synopsis: "este es una película de acción",
        releaseYear: 2015
    }
    const res = await request(app)
        .post('/movies')
        .send(movies);
        moviesId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].genres).toBeDefined();
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
});

test('PUT /movies/:id', async () => {
    const movieUpdated = {
        name: 'Fuerza Delta updated'
    }
    const res = await request(app)
        .put(`/movies/${moviesId}`)
        .send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/genres should set the movie genres', async () => {
    const genre = await Genre.create({ name: "acción" })
    const res = await request(app)
        .post(`/movies/${moviesId}/genres`)
        .send([ genre.id ])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/actors should set the movie actors', async () => {
    const actor = await Actor.create({ 
        firstName: "Steven",
        lastName: "Seagal",
        nationality: "Estados Unidos",
        image: "https://mi-imagen.jpg",
        birthday:"1995/03/02"
    })
    const res = await request(app)
        .post(`/movies/${moviesId}/actors`)
        .send([ actor.id ])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors should set the movie directors', async () => {
    const director = await Director.create({ 
        firstName: "Steven",
        lastName: "Seagal",
        nationality: "Estados Unidos",
        image: "https://mi-imagen.jpg",
        birthday:"1995/03/02"
    })
    const res = await request(app)
        .post(`/movies/${moviesId}/directors`)
        .send([ director.id ])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${moviesId}`);
    expect(res.status).toBe(204);
});
