import moment from 'moment';
import {
    AbsenteeModel,
    AbsenteeStatus,
    AbsenteeType,
    getAbsenteesModel,
} from '../model/absentees.model';
import { getUser } from '../model/user.model';
import { PageInput, PageResults, paginate } from '../utils/pagination';

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
    const userName = getUser(userId)?.name || String(userId);
    return {
        id,
        userName,
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
        date?: string;
    }
): PageResults<Absentee> {
    const absenteesModel = getAbsenteesModel();
    let filteredResults = absenteesModel;
    if (filter.type) {
        filteredResults = absenteesModel.filter((absentee) => {
            return absentee.type === filter.type;
        });
    }
    if (filter.date) {
        filteredResults = filteredResults.filter((absentee) => {
            const isDateInRange = moment(filter.date).isBetween(
                absentee.startDate,
                absentee.endDate,
                'days',
                '[]'
            );
            return isDateInRange;
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
