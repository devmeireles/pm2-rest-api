import { Request, Response } from 'express';
import articleService from './article.service';
import { ArticleValidator } from './article.validator';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

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
      const { author_id, content, intro, title } = req.body as CreateArticleDTO;
      const created_at = new Date().toISOString();

      const isInvalid = await new ArticleValidator({
        author_id,
        content,
        intro,
        title,
        created_at,
      }).validate();

      if (isInvalid) {
        res.status(400);
        throw new Error(JSON.stringify(isInvalid));
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
        message: error instanceof Error ? JSON.parse(error.message) : error,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {

      const { id } = req.params;
      const { title, intro } = req.body as UpdateArticleDTO;

      const updatedArticle = await articleService.updateArticle(+id, { title, intro });

      return res.status(200).json({
        success: true,
        data: updatedArticle,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}

export default new ArticleController();
