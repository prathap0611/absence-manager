import { payload } from '../mock-data/members.json';

export interface User {
    crewId: number;
    id: number;
    image: string;
    name: string;
    userId: number;
}

const userIdMap = payload.reduce<Map<number, User>>((agg, user) => {
    agg.set(user.userId, user);
    return agg;
}, new Map());

export function getUsers(): User[] {
    return payload;
}

export function getUser(id: number) {
    return userIdMap.get(id);
}
