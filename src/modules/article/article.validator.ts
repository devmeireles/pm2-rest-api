import { IsNumber, IsString } from 'class-validator';
import { BaseValidator } from '../../helpers/base-validator.helper';
import { IArticle } from './interface/article.interface';

export class ArticleValidator extends BaseValidator implements Omit<IArticle, 'id'> {
  @IsString()
  title: string;

  @IsString()
  intro: string;

  @IsString()
  content: string;

  @IsNumber()
  author_id: number;

  constructor(arg: Record<string, any>) {
    super();
    Object.assign(this, arg);
  }
}
