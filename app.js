import express, { json } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import limiter from './middlewares/rateLimiter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const corsAllowedOrigins = [
  // 'https://mesto.nomoredomainsrocks.ru',
  // 'http://mesto.nomoredomainsrocks.ru',
  // 'http://localhost:5173',
];

const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());

app.use(cors({
  origin: corsAllowedOrigins,
  credentials: true,
  maxAge: 60,
  allowedHeaders: ['Content-Type'],
}));

app.use(limiter);
app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

export default app;
