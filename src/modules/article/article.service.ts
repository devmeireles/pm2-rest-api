import fs from 'fs';
import path from 'path';
import data from '../../data/database.json';
import { IArticle } from '../../interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';

class ArticleService {
  public async getArticleByID(id: number): Promise<IArticle> {
    return data.filter((item) => item.id === id)[0];
  }

  public async getLastArticleID(): Promise<number> {
    return data.sort((a, b) => b.id - a.id)[0].id;
  }

  public async getAllArticles(): Promise<IArticle[]> {
    return data;
  }

  public async saveArticle(article: CreateArticleDTO): Promise<IArticle> {
    const newArticle: IArticle = {
      id: (await this.getLastArticleID()) + 1,
      ...article,
    };

    data.push(newArticle);
    fs.writeFileSync(path.join(__dirname, `../../data/database.json`), JSON.stringify(data));

    return newArticle;
  }
}

export default new ArticleService();
