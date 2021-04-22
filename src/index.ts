import express from 'express';
import { userRouter } from './routers/users';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
