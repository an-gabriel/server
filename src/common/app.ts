import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import '../database.connect';

import { InversifyExpressServer } from 'inversify-express-utils';

import logger from './logger';
import { DiContainer } from '../di.container';

const container = DiContainer.getContainer();
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(req.url);
    next();
  });
  app.use(express.json());
});

const app = server.build();

export default app;
