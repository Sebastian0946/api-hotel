import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser'; // Importar body-parser

import routes from './routes';
import { errorHandler } from './errorHandler';

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(errorHandler);
app.use(express.json());
app.use("/api", routes);

app.use((req, res, next) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: `Endpoint not found: ${req.method} ${req.url}`,
        },
    });
});

export default app;
