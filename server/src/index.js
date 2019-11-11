import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import dataBase from '../config/db';
import router from './router';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT || 5000;
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

import '../config/passport';

app.set('port', port);

dataBase;

app.use('/api', router);
app.get('*', (req, res) => res.status(405).send({
  message: 'Ups! this route does not exist',
}));
app.post('*', (req, res) => res.status(405).send({
  message: 'Ups! this route does not exist',
}));

const server = http.createServer(app);

server.listen(port);

module.exports = app;

