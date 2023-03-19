import { IsString } from 'class-validator';
import { BaseValidator } from '../../../helpers/base-validator.helper';
import { UpdateArticleDTO } from '../dto/update-article.dto';

export class UpdateArticleValidator extends BaseValidator implements UpdateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  intro: string;

  constructor(arg: Record<string, any>) {
    super();
    Object.assign(this, arg);
  }
}
