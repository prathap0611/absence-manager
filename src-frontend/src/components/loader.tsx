import { ReactNode } from 'react';

export default function LoadingIndicator({
    children,
    isLoading,
}: {
    children: ReactNode;
    isLoading: boolean;
}) {
    return (
        <>
            {isLoading && (
                <div className="loader">Loading data... Please wait...</div>
            )}
            {children}
        </>
    );
}
