import express from 'express';
import helmet from 'helmet';
import { buildRoutes } from './routes';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

buildRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

export default app;
