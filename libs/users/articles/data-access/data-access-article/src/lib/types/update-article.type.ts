import { Article } from '@users/shared/data-access-models';

export type UpdateArticleDTO = Pick<Article, 'title' | 'content'> & {
  articlesId: number;
};
