import React, { useEffect, useState } from 'react';
import { useDataApi } from '../hooks/use-data-api';
import {
    fetchAbsentees,
    FetchAbsenteesConfig,
    PaginatedAbsentees,
    TypeFilter,
} from '../services/api';
import AbsenteesTable from './absentees-table';
import AppHeader from './app-header';
import ErrorBoundary from './error-boundary';
import './app.css';

export default function App() {
    const initialValue: PaginatedAbsentees = {
        offset: 0,
        limit: 10,
        totalNumberOfPages: 0,
        totalRecords: 0,
        results: [],
    };
    const [currentPage, setCurrentPage] = useState(0);
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("");

    const { isLoading, data, error, doFetch } = useDataApi<
        PaginatedAbsentees,
        FetchAbsenteesConfig
    >(initialValue, { currentPage, typeFilter }, fetchAbsentees);

    useEffect(() => {
        doFetch({ currentPage, typeFilter });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, typeFilter]);

    return (
        <div>
            <ErrorBoundary>
                <AppHeader />
                <main>
                    <AbsenteesTable
                        absentees={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        typeFilter={typeFilter}
                        setTypeFilter={setTypeFilter}
                    />
                </main>
            </ErrorBoundary>
        </div>
    );
}
