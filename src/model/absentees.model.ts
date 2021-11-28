import { payload } from '../mock-data/absences.json';

export type AbsenteeStatus = 'Requested' | 'Confirmed' | 'Rejected';
export type AbsenteeType = 'vacation' | 'sickness';
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
    type: AbsenteeType;
    userId: number;
    status: AbsenteeStatus;
}

function getAbsenteeStatus({
    rejectedAt,
    confirmedAt,
}: {
    rejectedAt: string | null;
    confirmedAt: string | null;
}): AbsenteeStatus {
    if (rejectedAt) {
        return 'Rejected';
    } else if (confirmedAt) {
        return 'Confirmed';
    } else {
        return 'Requested';
    }
}

export function getAbsenteesModel(): AbsenteeModel[] {
    return payload.map((data) => {
        return {
            ...data,
            type: data.type === 'sickness' ? 'sickness' : 'vacation',
            status: getAbsenteeStatus({
                rejectedAt: data.rejectedAt,
                confirmedAt: data.confirmedAt,
            }),
        };
    });
}
