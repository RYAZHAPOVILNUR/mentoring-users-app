import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Article } from '@users/shared/data-access-models';

import { CreateArticle } from '../interfaces/create-article.interface';

export const articlesActions = createActionGroup({
  source: 'Article',
  events: {
    publishArticle: props<{ article: CreateArticle }>(),
    publishArticleSuccess: emptyProps(),
    publishArticleFailed: props<{ error: Error }>(),

    editArticle: props<{ articleData: CreateArticle; id: number }>(),
    editArticleSuccess: props<{ articles: Article }>(),
    editArticleFailed: props<{ error: Error }>(),

    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{ articles: Article[] }>(),
    loadArticlesFailed: props<{ error: Error }>(),

    getArticleForEdit: props<{ id: string }>(),
    getArticleForEditSuccess: props<{ article: Article }>(),
    getArticleForEditFailed: props<{ error: Error }>(),

    getArticleForRead: emptyProps(),
    getArticleForReadSuccess: props<{ article: Article }>(),
    getArticleForReadFailed: props<{ error: Error }>(),

    deleteColumn: props<{ columnIndex: number }>(),
  },
});
