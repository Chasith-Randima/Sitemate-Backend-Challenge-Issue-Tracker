import express from 'express';

import issueRouter from './routes/issueRoutes';

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/issues', issueRouter);

export default app;