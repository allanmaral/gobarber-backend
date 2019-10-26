import express from 'express';
import 'express-async-errors';

import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';


class App {
  constructor() {
    this.server = express();

    this.sentrySetup();

    this.middlewares();
    this.routes();

    this.sentryPostSetup();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads')),
    );
  }

  routes() {
    this.server.use(routes);
  }

  sentrySetup() {
    Sentry.init(sentryConfig);
    this.server.use(Sentry.Handlers.requestHandler());
  }

  sentryPostSetup() {
    this.server.use(Sentry.Handlers.errorHandler());
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
