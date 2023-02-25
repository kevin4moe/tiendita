// Description: This is the entry point for the application
import express from 'express';
import cookieParser from 'cookie-parser';
import { handler as ssrHandler } from './web/dist/server/entry.mjs';
import routerApi from './routes/index.js';

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middleware/error.handler.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.static('web/dist/client/'));
app.use(ssrHandler);

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
