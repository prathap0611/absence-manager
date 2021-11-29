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

export type TypeFilter = 'vacation' | 'sickness' | '';

export interface FetchAbsenteesConfig {
    currentPage: number;
    typeFilter: TypeFilter;
    dateFilter: string;
}

export async function fetchAbsentees({
    currentPage,
    typeFilter,
    dateFilter
}: FetchAbsenteesConfig): Promise<PaginatedAbsentees> {
    const limit = 10;
    const offset = currentPage * limit;
    try {
        const queryParams = {
            offset: String(offset),
            limit: String(limit),
            ...(typeFilter && {type: typeFilter}),
            ...(dateFilter && {date: dateFilter})
        };
        const response = await fetch(
            '/api/absentees?' + new URLSearchParams(queryParams)
        );
        const absentees: PaginatedAbsentees = await response.json();
        return absentees;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch data');
    }
}
