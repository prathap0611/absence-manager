import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler';
import { buildRoutes } from './routes';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

buildRoutes(app);

app.use(errorHandler);

app.use((req, res) => {
    res.sendStatus(404);
});

export default app;
