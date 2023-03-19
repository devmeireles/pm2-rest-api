import fileHandler from '../../helpers/file-handler.helper';
import { IArticle } from '../../interfaces/article.interface';
import IQueryFilters from '../../interfaces/query-filters.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';

class ArticleService {
  private data: IArticle[];

  constructor() {
    this.data = fileHandler.getData() as unknown as IArticle[];
  }

  public async getArticleByID(id: number): Promise<IArticle> {
    return this.data.filter((article) => article.id === id)[0] as unknown as IArticle;
  }

  public async getLastArticleID(): Promise<number> {
    return this.data.sort((a, b) => b.id - a.id)[0].id;
  }

  public async getAllArticles(): Promise<IArticle[]> {
    return this.data;
  }

  public async getFilteredArticles(filters: IQueryFilters): Promise<IArticle[]> {
    let articles = this.data;

    if (filters.title) {
      articles = articles.filter((article) => article.title.toLowerCase().includes(filters.title!.toLowerCase()));
    }

    if (filters.date_from) {
      articles = articles.filter((article) => new Date(article.created_at) >= new Date(filters.date_from!));
    }

    if (filters.date_to) {
      articles = articles.filter((article) => new Date(article.created_at) <= new Date(filters.date_to!));
    }

    const limit = Number(filters.limit) || 5;
    const page = Number(filters.page) || 1;
    const starting = (page - 1) * limit;
    const finishing = page * limit;

    articles = articles.slice(starting, finishing);

    return articles;
  }

  public async saveArticle(article: CreateArticleDTO): Promise<IArticle> {
    const newArticle: IArticle = {
      id: (await this.getLastArticleID()) + 1,
      ...article,
    };

    fileHandler.setData(newArticle);

    return newArticle;
  }

  public async updateArticle(id: number, updateData: UpdateArticleDTO): Promise<IArticle> {
    const article = await this.getArticleByID(id);

    if (!article) {
      throw new Error(`Article not found`);
    }

    Object.assign(article, {
      intro: updateData.intro,
      title: updateData.title,
    });

    fileHandler.updateData(id, article);

    return article;
  }
}

export default new ArticleService();
