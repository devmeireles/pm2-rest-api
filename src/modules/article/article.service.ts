import fs from 'fs';
import path from 'path';
import data from '../../data/database.json';
import { IArticle } from '../../interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

class ArticleService {
  public async getArticleByID(id: number): Promise<IArticle> {
    return data.filter((item) => item.id === id)[0] as unknown as IArticle;
  }

  public async getLastArticleID(): Promise<number> {
    return data.sort((a, b) => b.id - a.id)[0].id;
  }

  public async getAllArticles(): Promise<IArticle[]> {
    return data as unknown as IArticle[];
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

  public async updateArticle(id: number, updateData: UpdateArticleDTO): Promise<IArticle> {
    const article = await this.getArticleByID(id);

    if (!article) {
      throw new Error("Item not found");
    }

    const toRemoveIndex = data.findIndex(item => item.id === id);

    data.splice(toRemoveIndex, 1);    
    Object.assign(article, updateData);
    data.push(article);

    fs.writeFileSync(path.join(__dirname, `../../data/database.json`), JSON.stringify(data));

    return article;
  }
}

export default new ArticleService();
