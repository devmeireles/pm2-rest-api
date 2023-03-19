import fileHandler from '../../helpers/file-handler.helper';
import { IArticle } from '../../interfaces/article.interface';

class AuthorService {
  private data: IArticle[];

  constructor() {
    this.data = fileHandler.getData() as unknown as IArticle[];
  }

  public async getArticlesByAuthorId(author_id: number): Promise<IArticle[]> {
    return this.data.filter((item) => item.author_id === author_id);
  }
}

export default new AuthorService();
