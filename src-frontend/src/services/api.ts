export type AbsenteeStatus = 'Requested' | 'Confirmed' | 'Rejected';
export type AbsenteeType = 'vacation' | 'sickness';

export interface Absentee {
    id: number;
    userName: string;
    type: AbsenteeType;
    startDate: string | null;
    endDate: string | null;
    memberNote: string;
    status: AbsenteeStatus;
    admitterNote: string;
}

export interface PaginatedAbsentees {
    totalNumberOfPages: number;
    totalRecords: number;
    offset: number;
    limit: number;
    results: Absentee[];
}

export interface FetchAbsenteesConfig {
    currentPage: number;
}

export async function fetchAbsentees({
    currentPage,
}: FetchAbsenteesConfig): Promise<PaginatedAbsentees> {
    const limit = 10;
    const offset = currentPage * limit;
    try {
        const response = await fetch(
            '/api/absentees?' +
                new URLSearchParams({
                    offset: String(offset),
                    limit: String(limit),
                })
        );
        const absentees: PaginatedAbsentees = await response.json();
        return absentees;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch data');
    }
}
