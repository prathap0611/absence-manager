import React from 'react';
import { useDataApi } from '../hooks/use-data-api';
import { fetchAbsentees, PaginatedAbsentees } from '../services/api';
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
    const { isLoading, data, error } = useDataApi<PaginatedAbsentees, string>(
        initialValue,
        '',
        fetchAbsentees
    );

    return (
        <div>
            <ErrorBoundary>
                <AppHeader />
                <main>
                    <AbsenteesTable absentees={data} />
                </main>
            </ErrorBoundary>
        </div>
    );
}
