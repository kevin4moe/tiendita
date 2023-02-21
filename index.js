// Description: This is the entry point for the application
import express from 'express';
import routerApi from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
