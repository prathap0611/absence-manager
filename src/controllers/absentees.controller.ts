import { AbsenteeModel, getAbsenteesModel } from '../model/absentees.model';

export type AbsenteeStatus = 'Requested' | 'Confirmed' | 'Rejected';

function getAbsenteeStatus({
    rejectedAt,
    confirmedAt,
}: AbsenteeModel): AbsenteeStatus {
    if (rejectedAt) {
        return 'Rejected';
    } else if (confirmedAt) {
        return 'Confirmed';
    } else {
        return 'Requested';
    }
}

export interface Absentee {
    id: number;
    userId: number;
    type: string;
    startDate: string | null;
    endDate: string | null;
    memberNote: string;
    status: AbsenteeStatus;
    admitterNote: string;
}

export function getAbsentees(): Absentee[] {
    const absenteesModel = getAbsenteesModel();
    return absenteesModel.map((data) => {
        return {
            id: data.id,
            userId: data.userId,
            type: data.type,
            memberNote: data.memberNote,
            status: getAbsenteeStatus(data),
            admitterNote: data.admitterNote,
            startDate: data.startDate,
            endDate: data.endDate,
        };
    });
}
