import { Router } from 'express';
import dataController from './data.controller';

const dataRoute = Router();

dataRoute.get(`/external`, dataController.index);

export default dataRoute;
