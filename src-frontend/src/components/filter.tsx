import React, { useCallback } from 'react';
import { TypeFilter } from '../services/api';

export default function TableFilter({
    typeFilter,
    setTypeFilter,
    dateFilter,
    setDateFilter,
    setCurrentPage
}: {
    typeFilter: TypeFilter;
    setTypeFilter: React.Dispatch<React.SetStateAction<TypeFilter>>;
    dateFilter: string;
    setDateFilter: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
        <section className="filter-container">
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
        </section>
    );
}
