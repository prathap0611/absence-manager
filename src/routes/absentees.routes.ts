import { Router } from 'express';
import { getAbsentees } from '../controllers/absentees.controller';
import { AbsenteeType } from '../model/absentees.model';

export function buildAbsenteesRoutes(): Router {
    const routes = Router();

    routes.get('/', (req, res) => {
        const offset = parseInt((req.query.offset as string) || '0');
        const limit = parseInt((req.query.limit as string) || '10');
        const absentees = getAbsentees(
            { offset, limit },
            {
                type: req.query.type as AbsenteeType,
                date: req.query.date as string,
            }
        );
        res.send(absentees);
    });

    return routes;
}
