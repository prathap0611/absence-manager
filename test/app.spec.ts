import request from 'supertest';
import app from '../src/app';

describe('Absentee manager tests', () => {
    it('Should fetch list of absentees with default offset and limit', async () => {
        const response = await request(app)
            .get('/absentees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(0);
        expect(data.limit).toEqual(10);
        expect(data.results.length).toEqual(10);
    });

    it('Should fetch list of absentees with given offset and limit', async () => {
        const response = await request(app)
            .get('/absentees')
            .query({ offset: 5, limit: 7 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(5);
        expect(data.limit).toEqual(7);
        expect(data.results.length).toEqual(7);
    });
});
