import React from 'react';
import moment from 'moment';
import { Absentee, PaginatedAbsentees } from '../services/api';
import './absentees-table.css';

const tableHeaders = [
    'Name',
    'Type',
    'Period',
    'Status',
    'Member Note',
    'Admitter Note',
];

export default function AbsenteesTable({
    absentees,
}: {
    absentees: PaginatedAbsentees;
}) {
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
                                <td>{absentee.id}</td>
                                <td>{absentee.type}</td>
                                <td>{periodInDays}</td>
                                <td>{absentee.status}</td>
                                <td>{absentee.memberNote}</td>
                                <td>{absentee.admitterNote}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}
