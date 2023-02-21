// Description: This is the entry point for the application
import express from 'express';
import { handler as ssrHandler } from './web/dist/server/entry.mjs';
import routerApi from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('web/dist/client/'));
app.use(ssrHandler);

routerApi(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
