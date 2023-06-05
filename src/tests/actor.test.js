const request = require('supertest');
const app = require('../app');
require('../models');

let actorsId;

test('POST /actors', async () => {
    const actors = {
        firstName: "Steven",
        lastName: "Seagal",
        nationality: "Estados Unidos",
        image: "https://mi-imagen.jpg",
        birthday:"1995/03/02"
    }
    const res = await request(app)
        .post('/actors')
        .send(actors)
    actorsId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test('PUT /actors/:id', async () => {
    const updatedActors = {
        firstName: "Steven",
    }
    const res = await request(app)
        .put(`/actors/${actorsId}`)
        .send(updatedActors);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedActors.name);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${actorsId}`)
    expect(res.status).toBe(204);
});

