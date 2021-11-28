import { Router } from 'express';
import { getAbsentees } from '../controllers/absentees.controller';

export function buildAbsenteesRoutes(): Router {
    const routes = Router();

    routes.get('/', (req, res) => {
        const absentees = getAbsentees();
        res.send(absentees);
    });

    return routes;
}
