const request = require('supertest');
const app = require('../app');
require('../models');

let genreId;

test('POST /gentes', async() => {
    const genre = {
        name: 'acción'
    }
    const res = await request(app).post('/genres').send(genre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /genres', async() => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test('PUT /genres/:id', async () => {
    const genreUpdated = {
        name: 'acción updated'
    }
    const res = await request(app)
        .put(`/genres/${genreId}`)
        .send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

test('DELETE /genres/:id', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
});
