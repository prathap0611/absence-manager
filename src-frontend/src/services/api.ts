export type AbsenteeStatus = 'Requested' | 'Confirmed' | 'Rejected';
export type AbsenteeType = 'vacation' | 'sickness';

export interface Absentee {
    id: number;
    userId: number;
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



export async function fetchAbsentees():Promise<PaginatedAbsentees> {
  try {
    const response = await fetch('/api/absentees');
    const absentees:PaginatedAbsentees = await response.json();
    return absentees;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch data');
  }
}