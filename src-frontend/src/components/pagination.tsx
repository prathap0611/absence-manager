import React, { useCallback } from 'react';
import './pagination.css'

export default function Pagination({
    totalNumberOfPages,
    currentPage,
    setCurrentPage,
}: {
    totalNumberOfPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
    const setPrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage]);

    const setNextPage = useCallback(() => {
        if (currentPage < totalNumberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, setCurrentPage, totalNumberOfPages]);

    return (
        <section className="pagination-group">
            <button
                className="page-btn"
                onClick={() => setPrevPage()}
                aria-label="previous page"
                disabled={currentPage <= 0}
            >
                &#9664;
            </button>
            <span className="page-info">{`${
                currentPage + 1
            } of ${totalNumberOfPages}`}</span>
            <button
                className="page-btn"
                onClick={() => setNextPage()}
                aria-label="next page"
                disabled={currentPage >= totalNumberOfPages - 1}
            >
                &#9654;
            </button>
        </section>
    );
}
