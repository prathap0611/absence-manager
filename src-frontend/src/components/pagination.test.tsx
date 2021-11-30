import { render, fireEvent } from '@testing-library/react';
import Pagination from './pagination';

describe('Pagination Tests', () => {
    const setCurrentPage = jest.fn();

    beforeEach(() => {
        setCurrentPage.mockReset();
    })

    it('should render the page correctly', () => {
        const {asFragment} = render(
            <Pagination
                totalNumberOfPages={5}
                currentPage={0}
                setCurrentPage={setCurrentPage}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should set prev page', () => {
        const { getByTestId } = render(
            <Pagination
                totalNumberOfPages={5}
                currentPage={1}
                setCurrentPage={setCurrentPage}
            />
        );
        fireEvent.click(getByTestId('prev-page'));
        expect(setCurrentPage).toBeCalledWith(0);
    });

    it('should disable prev page when current page number is 0', () => {
        const { getByTestId } = render(
            <Pagination
                totalNumberOfPages={5}
                currentPage={0}
                setCurrentPage={setCurrentPage}
            />
        );
        const prevButton = getByTestId('prev-page')
        expect(prevButton).toBeDisabled();

        fireEvent.click(prevButton);

        expect(setCurrentPage).toBeCalledTimes(0);
    });

    it('should set next page', () => {
        const { getByTestId } = render(
            <Pagination
                totalNumberOfPages={5}
                currentPage={1}
                setCurrentPage={setCurrentPage}
            />
        );
        const nextButton = getByTestId('next-page')
        fireEvent.click(nextButton);

        expect(setCurrentPage).toBeCalledWith(2);
    });


    it('should disabled next page when current page is one less than total number of pages', () => {
        const { getByTestId } = render(
            <Pagination
                totalNumberOfPages={5}
                currentPage={4}
                setCurrentPage={setCurrentPage}
            />
        );
        const nextButton = getByTestId('next-page')
        expect(nextButton).toBeDisabled();
        fireEvent.click(nextButton);

        expect(setCurrentPage).toBeCalledTimes(0);
    });
});
