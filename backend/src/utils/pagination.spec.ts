import { paginate } from './pagination';

function generateRecords(start: number, length: number) {
    return Array.from({ length }).map((ele, i) => `record ${i + start}`);
}

describe('pagination tests', () => {
    const inputRecords = generateRecords(0, 46);

    it('should paginate the results with default limit and offset', () => {
        const expectedRecords = generateRecords(0, 10);
        const paginatedResults = paginate(inputRecords, {});
        expect(paginatedResults.limit).toEqual(10);
        expect(paginatedResults.offset).toEqual(0);
        expect(paginatedResults.totalNumberOfPages).toEqual(5);
        expect(paginatedResults.totalRecords).toEqual(46);
        expect(paginatedResults.results).toEqual(expectedRecords);
    });

    it('should paginate the results with limit and offset', () => {
        const expectedRecords = generateRecords(20, 10);
        const paginatedResults = paginate(inputRecords, {
            offset: 20,
            limit: 10,
        });
        expect(paginatedResults.limit).toEqual(10);
        expect(paginatedResults.offset).toEqual(20);
        expect(paginatedResults.totalNumberOfPages).toEqual(5);
        expect(paginatedResults.totalRecords).toEqual(46);
        expect(paginatedResults.results).toEqual(expectedRecords);
    });
});
