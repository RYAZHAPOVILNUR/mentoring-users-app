import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Article } from '@users/shared/data-access-models';

import { ArticleVM } from '../types/article-vm.interface';

export const articlesActions = createActionGroup({
  source: 'Articles',
  events: {
    addArticle: props<{ article: ArticleVM }>(),
    addArticleSuccess: props<{ article: Article }>(),
    addArticleFailed: props<{ error: Error }>(),

    getAll: emptyProps(),
    getAllSuccess: props<{ articles: Article[] }>(),
    getAllFailed: props<{ error: Error }>(),

    updateArticle: props<{ article: ArticleVM }>(),
    updateArticleSuccess: props<{ article: Article }>(),
    updateArticleFailed: props<{ error: Error }>(),

    getOne: emptyProps(),
    getOneSuccess: props<{ article: Article }>(),
    getOneFailed: props<{ error: Error }>(),
  },
});
