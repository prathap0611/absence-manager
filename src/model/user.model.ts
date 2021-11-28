import { payload } from '../mock-data/members.json';

export interface User {
    crewId: number;
    id: number;
    image: string;
    name: string;
    userId: number;
}

export function getUsers(): User[] {
    return payload;
}
