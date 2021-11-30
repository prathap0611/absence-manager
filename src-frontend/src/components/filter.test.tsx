import { render, fireEvent } from '@testing-library/react';
import TableFilter from './filter';

describe('filter tests', () => {
    const setTypeFilter = jest.fn();
    const setDateFilter = jest.fn();
    const setCurrentPage = jest.fn();

    it('should render the page correctly', () => {
        const { asFragment } = render(
            <TableFilter
                typeFilter="vacation"
                setTypeFilter={setTypeFilter}
                dateFilter="03/11/2020"
                setDateFilter={setDateFilter}
                setCurrentPage={setCurrentPage}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should set filter type and reset current page', () => {
        const { getByTestId } = render(
            <TableFilter
                typeFilter=""
                setTypeFilter={setTypeFilter}
                dateFilter=""
                setDateFilter={setDateFilter}
                setCurrentPage={setCurrentPage}
            />
        );

        const typeFilter = getByTestId('type-filter');
        fireEvent.change(typeFilter, { target: { value: 'vacation' } });

        expect(setTypeFilter).toBeCalledWith('vacation');
        expect(setCurrentPage).toBeCalledWith(0);
    });

    it('should date filter and reset current page', () => {
        const { getByTestId } = render(
            <TableFilter
                typeFilter=""
                setTypeFilter={setTypeFilter}
                dateFilter=""
                setDateFilter={setDateFilter}
                setCurrentPage={setCurrentPage}
            />
        );

        const dateFilter = getByTestId('date-filter');
        fireEvent.change(dateFilter, { target: { value: '2020-05-12' } });

        expect(setDateFilter).toBeCalledWith('2020-05-12');
        expect(setCurrentPage).toBeCalledWith(0);
    });
});
