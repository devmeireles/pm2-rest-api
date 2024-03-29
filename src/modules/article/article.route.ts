import { Router } from 'express';
import articleController from './article.controller';

const articleRoute = Router();

articleRoute.get(`/`, articleController.index);
articleRoute.get(`/search`, articleController.search);
articleRoute.get(`/:id`, articleController.show);
articleRoute.post(`/`, articleController.create);
articleRoute.put(`/:id`, articleController.update);

export default articleRoute;
