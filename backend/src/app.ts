import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import issueRouter from './routes/issueRoutes';
import userRouter from './routes/userRoutes';

const app = express();

app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/users', userRouter);

export default app;