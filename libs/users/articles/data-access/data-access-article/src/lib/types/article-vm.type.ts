import { Article } from '@users/shared/data-access-models';

export type ArticleVM = Pick<Article, 'title' | 'content'>;
