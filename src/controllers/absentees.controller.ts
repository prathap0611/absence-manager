import {
    AbsenteeModel,
    AbsenteeStatus,
    getAbsenteesModel,
} from '../model/absentees.model';
import { PageInput, PageResults, paginate } from '../utils/pagination';

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

function transformAbsenteeFromModel({
    id,
    userId,
    type,
    memberNote,
    status,
    admitterNote,
    startDate,
    endDate,
}: AbsenteeModel): Absentee {
    return {
        id,
        userId,
        type,
        memberNote,
        status,
        admitterNote,
        startDate,
        endDate,
    };
}

export function getAbsentees(page: PageInput): PageResults<Absentee> {
    const absenteesModel = getAbsenteesModel();
    const paginatedAbsenteesModel = paginate(absenteesModel, page);
    return {
        ...paginatedAbsenteesModel,
        results: paginatedAbsenteesModel.results.map((data) =>
            transformAbsenteeFromModel(data)
        ),
    };
}
