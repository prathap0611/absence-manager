import React, { useCallback } from 'react';
import moment from 'moment';
import { PaginatedAbsentees, TypeFilter } from '../services/api';
import './absentees-table.css';
import Pagination from './pagination';

const tableHeaders = [
    'Name',
    'Type',
    'Start Date',
    'End Date',
    'Status',
    'Member Note',
    'Admitter Note',
];

export default function AbsenteesTable({
    absentees,
    currentPage,
    setCurrentPage,
    typeFilter,
    setTypeFilter,
    dateFilter,
    setDateFilter,
}: {
    absentees: PaginatedAbsentees;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    typeFilter: TypeFilter;
    setTypeFilter: React.Dispatch<React.SetStateAction<TypeFilter>>;
    dateFilter: string;
    setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
    const applyTypeFilter = useCallback(
        (e) => {
            setCurrentPage(0); // Reset to first page whenever the filter changes
            setTypeFilter(e.target.value);
        },
        [setTypeFilter, setCurrentPage]
    );

    const applyDateFilter = useCallback(
        (e) => {
            setCurrentPage(0); // Reset to first page whenever the filter changes
            setDateFilter(e.target.value);
        },
        [setDateFilter, setCurrentPage]
    );
    return (
        <section className="table-container">
            <section className="top-container">
                <section className="filter-container">
                    <div>
                        {' '}
                        <label htmlFor="type-filter">
                            Choose filter type:&nbsp;
                            <select
                                id="type-filter"
                                value={typeFilter}
                                className="type-filter"
                                onChange={applyTypeFilter}
                            >
                                <option value={''}>Filter by type</option>
                                <option value="vacation">Vacation</option>
                                <option value="sickness">Sickness</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="date-filter">
                            Choose filter date:&nbsp;
                            <input
                                type="date"
                                id="date-filter"
                                value={dateFilter}
                                className="date-filter"
                                onChange={applyDateFilter}
                            />
                        </label>
                    </div>
                </section>
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
                        const startDate = moment(absentee.startDate).format('DD/MM/YYYY');
                        const endDate = moment(absentee.endDate).format('DD/MM/YYYY');
                        return (
                            <tr key={absentee.id}>
                                <td>{absentee.userName}</td>
                                <td>{absentee.type}</td>
                                <td>{startDate}</td>
                                <td>{endDate}</td>
                                <td>{absentee.status}</td>
                                <td>{absentee.memberNote}</td>
                                <td>{absentee.admitterNote}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalNumberOfPages={
                                    absentees.totalNumberOfPages
                                }
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
    );
}
