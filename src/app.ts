import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import articleRoute from './modules/article/article.route';
import authorRoute from './modules/author/author.route';
import dataRoute from './modules/data/data.routes';

dotenv.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(`/article`, articleRoute);
    this.express.use(`/author`, authorRoute);
    this.express.use(`/data`, dataRoute);
  }
}

export default new App().express;
