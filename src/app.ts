import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://learn-japanese-vocab.netlify.app',
    ],
    credentials: true,
  }),
);

// Application routes
app.use('/', router);

// Global error handler
app.use(globalErrorHandler);

// Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
