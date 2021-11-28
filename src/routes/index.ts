import { Application } from 'express';
import { buildAbsenteesRoutes } from './absentees.routes';

export function buildRoutes(app: Application) {
    app.use('/absentees', buildAbsenteesRoutes());
}
