import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import limiter from './middlewares/rateLimiter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import { corsConfig } from './utils/constants.js';

const app = express();

app.use(cors(corsConfig));
app.use(json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

export default app;
