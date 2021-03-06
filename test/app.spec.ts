import request from 'supertest';
import app from '../src/app';
import { Absentee } from '../src/controllers/absentees.controller';

describe('Absentee manager tests', () => {
    it('Should fetch list of absentees with default offset and limit', async () => {
        const response = await request(app)
            .get('/api/absentees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(0);
        expect(data.limit).toEqual(10);
        expect(data.results.length).toEqual(10);
    });

    it('Should fetch list of absentees with given offset and limit', async () => {
        const response = await request(app)
            .get('/api/absentees')
            .query({ offset: 5, limit: 7 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(5);
        expect(data.limit).toEqual(7);
        expect(data.results.length).toEqual(7);
    });

    it('Should filter list of absentees by type', async () => {
        const response = await request(app)
            .get('/api/absentees')
            .query({ type: 'vacation' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(0);
        expect(data.limit).toEqual(10);
        data.results.forEach((result: Absentee) => {
            expect(result.type).toEqual('vacation');
        });
    });

    it('Should filter list of absentees by date', async () => {
        const response = await request(app)
            .get('/api/absentees')
            .query({ date: '2021-06-26' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        const data = response.body;

        expect(data.offset).toEqual(0);
        expect(data.limit).toEqual(10);
        expect(Array.isArray(data.results)).toEqual(true);
    });

    it('Should return error for invalid offset ', async () => {
        await request(app)
            .get('/api/absentees')
            .query({
                offset: 'not a number',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it('Should return error for invalid type ', async () => {
        await request(app)
            .get('/api/absentees')
            .query({
                type: 'invalid type',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it('Should return error for invalid date ', async () => {
        await request(app)
            .get('/api/absentees')
            .query({
                date: 'some date',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it('Should return error for invalid limit ', async () => {
        await request(app)
            .get('/api/absentees')
            .query({
                limit: 'not a number',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });
});
