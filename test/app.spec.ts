import request from 'supertest';
import app from '../src/app';

describe('Absentee manager tests', () => {
    it('Should fetch list of absentees', async () => {
        const data = await request(app)
            .get('/absentees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(Array.isArray(data.body)).toEqual(true);
    });
});
