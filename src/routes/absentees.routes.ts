import { Router } from 'express';
import { getAbsentees } from '../controllers/absentees.controller';

export function buildAbsenteesRoutes(): Router {
    const routes = Router();

    routes.get('/', (req, res) => {
        const offset = parseInt((req.query.offset as string) || '0');
        const limit = parseInt((req.query.limit as string) || '10');
        const absentees = getAbsentees({ offset, limit });
        res.send(absentees);
    });

    return routes;
}
