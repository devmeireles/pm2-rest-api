import { Request, Response } from 'express';
import dataService from './data.service';

class DataController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await dataService.readFromExternal();
      return res.status(200).json({
        success: true,
        data: JSON.parse(articles),
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  public async fetchData(req: Request, res: Response): Promise<Response> {
    try {
      await dataService.fetchFromExternal();
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}

export default new DataController();
