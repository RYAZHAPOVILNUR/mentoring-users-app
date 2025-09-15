import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '@users/shared/data-access-models';

import { CreateArticle } from '../interfaces/create-article.interface';

export const articlesActions = createActionGroup({
  source: 'Article',
  events: {
    addArticle: props<{ article: CreateArticle }>(),
    addArticleSuccess: props<{ article: Article }>(),
    addArticleFailed: props<{ error: Error }>(),

    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{ articles: Article[] }>(),
    loadArticlesFailed: props<{ error: Error }>(),

    updateArticle: props<{ article: CreateArticle }>(),
    updateArticleSuccess: props<{ article: Article }>(),
    updateArticleFailed: props<{ error: Error }>(),

    loadArticle: emptyProps(),
    loadArticleSuccess: props<{ article: Article }>(),
    loadArticleFailed: props<{ error: Error }>(),
  },
});
