import request from 'supertest';
import app from '../app.js';

describe('App Routes', () => {
  it('should return Hello World for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });

    it('should return Welcome to surge API in root route', async () => {
        const response = await request(app).get('/api/v1/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Surge-Gram API');
    });


    it('should return 404 for an invalid route', async () => {
        const response = await request(app).get('/invalid');
        expect(response.statusCode).toBe(404);
    });
});
