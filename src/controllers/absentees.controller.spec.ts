import { AbsenteeModel } from '../model/absentees.model';
import { PageResults } from '../utils/pagination';
import { Absentee, getAbsentees } from './absentees.controller';

const mockAbsenteesModel = jest.fn();

jest.mock('../model/absentees.model', () => ({
    ...jest.requireActual('../model/absentees.model'),
    getAbsenteesModel: jest.fn().mockImplementation(() => mockAbsenteesModel()),
}));

describe('absentees controller spec', () => {
    it('should get absentees with paginated results', () => {
        const absenteeMock: AbsenteeModel = {
            admitterId: null,
            admitterNote: '',
            confirmedAt: '2020-12-12T18:03:55.000+01:00',
            createdAt: '2020-12-12T14:17:01.000+01:00',
            crewId: 352,
            endDate: '2021-01-13',
            id: 2351,
            memberNote: '',
            rejectedAt: null,
            startDate: '2021-01-13',
            type: 'sickness',
            userId: 1,
            status: 'Confirmed',
        };

        const mockedAbsenteesModel: AbsenteeModel[] = [
            {
                ...absenteeMock,
                id: 1,
                userId: 1,
            },
            {
                ...absenteeMock,
                id: 2,
                userId: 2,
            },
            {
                ...absenteeMock,
                id: 3,
                userId: 3,
            },
            {
                ...absenteeMock,
                id: 4,
                userId: 4,
            },
            {
                ...absenteeMock,
                id: 5,
                userId: 5,
            },
        ];
        mockAbsenteesModel.mockReturnValue(mockedAbsenteesModel);
        const expectedResult: PageResults<Absentee> = {
            offset: 1,
            limit: 2,
            totalNumberOfPages: 3,
            totalRecords: 5,
            results: [
                {
                    id: 2,
                    userId: 2,
                    type: 'sickness',
                    memberNote: '',
                    status: 'Confirmed',
                    admitterNote: '',
                    startDate: '2021-01-13',
                    endDate: '2021-01-13',
                },
                {
                    id: 3,
                    userId: 3,
                    type: 'sickness',
                    memberNote: '',
                    status: 'Confirmed',
                    admitterNote: '',
                    startDate: '2021-01-13',
                    endDate: '2021-01-13',
                },
            ],
        };
        const absentees = getAbsentees({ offset: 1, limit: 2 });
        expect(absentees).toEqual(expectedResult);
    });
});
