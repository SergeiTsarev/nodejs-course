import express from 'express';
import { userRouter } from './routers/users';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(3001, () => console.log('Application started'));
