import { Request, Response } from 'express';
import authorService from './author.service';

class AuthorController {
  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const author = await authorService.getArticlesByAuthorId(+id);

      if (author.length === 0) {
        res.status(404);
        throw new Error(`Author not found`);
      }

      return res.status(200).json({
        success: true,
        data: author,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}

export default new AuthorController();
