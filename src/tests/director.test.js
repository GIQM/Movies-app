const request = require('supertest')
const app = require('../app');
require('../models');

let directorsId;

test('POST /directors', async () => {
    const directors = {
        firstName: "Steven",
        lastName: "Seagal",
        nationality: "Estados Unidos",
        image: "https://mi-imagen.jpg",
        birthday:"1995/03/02"
    }
    const res = await request(app)
        .post('/directors')
        .send(directors);
    directorsId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test('PUT /directors/:id', async () => {
    const updatedDirectors = {
        firstName: "Steven",
    }
    const res = await request(app)
        .put(`/directors/${directorsId}`)
        .send(updatedDirectors);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedDirectors.name);
});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${directorsId}`);
    expect(res.status).toBe(204);
});
