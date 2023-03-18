import { Request, Response } from 'express';
import { ArticleValidator } from './article.validator';
import { IArticle } from './interface/article.interface';

class ArticleController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200);
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { author_id, content, intro, title } = req.body as IArticle;

      const isInvalid = await new ArticleValidator({
        author_id,
        content,
        intro,
        title,
      }).validate();

      if (isInvalid) {
        return res.status(400).json({
          success: false,
          message: isInvalid,
        });
      }

      return res.status(201).json({
        author_id,
        content,
        intro,
        title,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(201);
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export default new ArticleController();
