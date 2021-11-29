import React, { useEffect, useState } from 'react';
import { useDataApi } from '../hooks/use-data-api';
import {
    fetchAbsentees,
    FetchAbsenteesConfig,
    PaginatedAbsentees,
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

    const { isLoading, data, error, doFetch } = useDataApi<
        PaginatedAbsentees,
        FetchAbsenteesConfig
    >(initialValue, { currentPage }, fetchAbsentees);

    useEffect(() => {
        doFetch({ currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <div>
            <ErrorBoundary>
                <AppHeader />
                <main>
                    <AbsenteesTable
                        absentees={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </main>
            </ErrorBoundary>
        </div>
    );
}
