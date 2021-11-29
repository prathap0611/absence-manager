import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { errorHandler } from './middleware/error-handler';
import { buildRoutes } from './routes';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

buildRoutes(app);

app.use(errorHandler);

const buildPath = path.join(__dirname, '..', 'src-frontend', 'build');
app.use(express.static(buildPath));

app.get('/*', function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
});

export default app;
