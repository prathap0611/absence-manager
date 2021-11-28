export interface PageInput {
    offset?: number;
    limit?: number;
}

export interface PageResults<T> {
    totalNumberOfPages: number;
    totalRecords: number;
    offset: number;
    limit: number;
    results: T[];
}

const defaultOffet = 0;
const defaultLimit = 10;

export function paginate<T>(
    inputRecords: T[],
    { offset = defaultOffet, limit = defaultLimit }: PageInput
): PageResults<T> {
    const totalNumberOfPages = Math.ceil(inputRecords.length / limit);
    const results = inputRecords.slice(offset, offset + limit);
    return {
        offset,
        limit,
        totalNumberOfPages,
        totalRecords: inputRecords.length,
        results,
    };
}
