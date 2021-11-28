import {
    AbsenteeModel,
    AbsenteeStatus,
    AbsenteeType,
    getAbsenteesModel,
} from '../model/absentees.model';
import { PageInput, PageResults, paginate } from '../utils/pagination';

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

export function getAbsentees(
    page: PageInput,
    filter: {
        type?: AbsenteeType;
    }
): PageResults<Absentee> {
    const absenteesModel = getAbsenteesModel();
    let filteredResults = absenteesModel;
    if (filter.type) {
        filteredResults = absenteesModel.filter((absentee) => {
            return absentee.type === filter.type;
        });
    }
    const paginatedAbsenteesModel = paginate(filteredResults, page);
    return {
        ...paginatedAbsenteesModel,
        results: paginatedAbsenteesModel.results.map((data) =>
            transformAbsenteeFromModel(data)
        ),
    };
}
