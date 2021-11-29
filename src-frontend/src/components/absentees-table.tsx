import React from 'react';
import moment from 'moment';
import { PaginatedAbsentees, TypeFilter } from '../services/api';
import './absentees-table.css';
import Pagination from './pagination';
import TableFilter from './filter';
import LoadingIndicator from './loader';

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
    isLoading,
}: {
    absentees: PaginatedAbsentees;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    typeFilter: TypeFilter;
    setTypeFilter: React.Dispatch<React.SetStateAction<TypeFilter>>;
    dateFilter: string;
    setDateFilter: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
}) {
    return (
        <section className="table-container">
            <section className="top-container">
                <TableFilter
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    setCurrentPage={setCurrentPage}
                />
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
                    <LoadingIndicator isLoading={isLoading}>
                        {!absentees.results.length && (
                            <tr>
                                <td>No Matching Record</td>
                            </tr>
                        )}
                        {absentees.results.map((absentee) => {
                            const startDate = moment(absentee.startDate).format(
                                'DD/MM/YYYY'
                            );
                            const endDate = moment(absentee.endDate).format(
                                'DD/MM/YYYY'
                            );
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
                    </LoadingIndicator>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>
                            {absentees.results.length ? (
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalNumberOfPages={
                                        absentees.totalNumberOfPages
                                    }
                                />
                            ) : null}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
    );
}
