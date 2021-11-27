import express from 'express';
import helmet from 'helmet';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get('/', (req, res) => res.send('Hello World!'));

export default app;
