import { IsDateString, IsNumber, IsString } from 'class-validator';
import { BaseValidator } from '../../../helpers/base-validator.helper';
import { CreateArticleDTO } from '../dto/create-article.dto';

export class NewArticleValidator extends BaseValidator implements CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  intro: string;

  @IsString()
  content: string;

  @IsNumber()
  author_id: number;

  @IsDateString()
  created_at: string;

  constructor(arg: Record<string, any>) {
    super();
    Object.assign(this, arg);
  }
}
