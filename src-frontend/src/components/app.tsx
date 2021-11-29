import React from 'react';
import AppHeader from './app-header';
import ErrorBoundary from './error-boundary';

export default function App() {
    return (
        <div>
            <ErrorBoundary>
                <AppHeader />
                <main></main>
            </ErrorBoundary>
        </div>
    );
}
