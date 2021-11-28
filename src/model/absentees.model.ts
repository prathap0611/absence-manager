import { payload } from '../mock-data/absences.json';

export interface AbsenteeModel {
    admitterId: number | null;
    admitterNote: string;
    confirmedAt: string | null;
    createdAt: string;
    crewId: number;
    endDate: string | null;
    id: number;
    memberNote: string;
    rejectedAt: string | null;
    startDate: string | null;
    type: string;
    userId: number;
}

export function getAbsenteesModel(): AbsenteeModel[] {
    return payload;
}
