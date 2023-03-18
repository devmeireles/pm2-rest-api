import data from '../../data/database.json';
import { IArticle } from '../../interfaces/article.interface';

class AuthorService {
  public async getArticlesByAuthorId(author_id: number): Promise<IArticle[]> {
    return data.filter((item) => item.author_id === author_id);
  }
}

export default new AuthorService();
