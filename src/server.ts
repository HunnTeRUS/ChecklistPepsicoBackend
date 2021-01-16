import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';
import db from './database/config';
import { errors } from 'celebrate';
import { env } from './utils/constants';
import 'express-async-errors'

const app = express();
mongoose.connect(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(env.PORT);
