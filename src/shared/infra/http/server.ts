import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import router from './routes';
import getErrors from './middlewares/getErrors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errors());
app.use(getErrors);

app.listen(3333, () => console.log('🚀️ Server started on port 3333!'));
