import { render, fireEvent } from '@testing-library/react';
import { PaginatedAbsentees } from '../services/api';
import AbsenteesTable from './absentees-table';

describe('filter tests', () => {
    const setTypeFilter = jest.fn();
    const setDateFilter = jest.fn();
    const setCurrentPage = jest.fn();

    it('should render the page correctly', () => {
        const absentees: PaginatedAbsentees = {
            totalNumberOfPages: 5,
            totalRecords: 42,
            offset: 0,
            limit: 10,
            results: [
                {
                    id: 1,
                    userName: 'user 1',
                    type: 'sickness',
                    startDate: '05/12/2020',
                    endDate: '05/12/2020',
                    memberNote: '',
                    status: 'Confirmed',
                    admitterNote: '',
                },
                {
                    id: 2,
                    userName: 'user 2',
                    type: 'vacation',
                    startDate: '05/12/2020',
                    endDate: '05/12/2020',
                    memberNote: '',
                    status: 'Rejected',
                    admitterNote: '',
                },
            ],
        };
        const { asFragment } = render(
            <AbsenteesTable
                absentees={absentees}
                typeFilter="vacation"
                setTypeFilter={setTypeFilter}
                dateFilter="03/11/2020"
                setDateFilter={setDateFilter}
                setCurrentPage={setCurrentPage}
                isLoading={false}
                currentPage={0}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
