import React, { useCallback } from 'react';
import moment from 'moment';
import { PaginatedAbsentees } from '../services/api';
import './absentees-table.css';

const tableHeaders = [
    'Name',
    'Type',
    'Period (Days)',
    'Status',
    'Member Note',
    'Admitter Note',
];

export default function AbsenteesTable({
    absentees,
    currentPage,
    setCurrentPage,
}: {
    absentees: PaginatedAbsentees;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
    const setPrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage]);

    const setNextPage = useCallback(() => {
        if (currentPage < absentees.totalNumberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, setCurrentPage, absentees.totalNumberOfPages]);

    return (
        <section className="table-container">
            <section className="top-container">
                <section className="filter-container"></section>
                <div className="absentees-count">{`Total Absentees ${absentees.totalRecords}`}</div>
            </section>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th scope="col" key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {absentees.results.map((absentee) => {
                        const startDate = moment(absentee.startDate);
                        const endDate = moment(absentee.endDate);
                        const periodInDays =
                            endDate.diff(startDate, 'days') + 1; // To include start date
                        return (
                            <tr key={absentee.id}>
                                <td>{absentee.userName}</td>
                                <td>{absentee.type}</td>
                                <td>{periodInDays}</td>
                                <td>{absentee.status}</td>
                                <td>{absentee.memberNote}</td>
                                <td>{absentee.admitterNote}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <td colSpan={6}>
                        <section className="pagination-group">
                        <button
                            className="page-btn"
                            onClick={() => setPrevPage()}
                            aria-label="previous page"
                            disabled={currentPage <= 0}
                        >
                            &#9664;
                        </button>
                        <span className="page-info">{`${currentPage + 1} of ${
                            absentees.totalNumberOfPages
                        }`}</span>
                        <button
                            className="page-btn"
                            onClick={() => setNextPage()}
                            aria-label="next page"
                            disabled={currentPage >= absentees.totalNumberOfPages - 1 }
                        >
                            &#9654;
                        </button>
                        </section>
                    </td>
                </tfoot>
            </table>
        </section>
    );
}
