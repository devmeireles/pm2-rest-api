import { Router } from 'express';
import authorController from './author.controller';

const authorRoute = Router();

authorRoute.get(`/:id`, authorController.show);

export default authorRoute;
