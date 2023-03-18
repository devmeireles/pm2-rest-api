import { Request, Response } from 'express';
import articleService from './article.service';
import { ArticleValidator } from './article.validator';
import { IArticle } from '../../interfaces/article.interface';

class ArticleController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await articleService.getAllArticles();
      return res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const article = await articleService.getArticleByID(+id);

      if (!article) {
        res.status(404);
        throw new Error(`Article not found`);
      }

      return res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { author_id, content, intro, title } = req.body as IArticle;
      const created_at = new Date().toISOString();

      const isInvalid = await new ArticleValidator({
        author_id,
        content,
        intro,
        title,
        created_at,
      }).validate();

      if (isInvalid) {
        return res.status(400).json({
          success: false,
          message: isInvalid,
        });
      }

      const newArticle = await articleService.saveArticle({
        author_id,
        content,
        intro,
        title,
        created_at,
      });

      return res.status(201).json({
        success: true,
        data: newArticle,
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
