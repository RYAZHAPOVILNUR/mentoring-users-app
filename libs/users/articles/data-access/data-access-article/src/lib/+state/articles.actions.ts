import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Article } from '@users/shared/data-access-models';

import { ArticleVM } from '../types/article-vm.type';

export const articlesActions = createActionGroup({
  source: 'Article',
  events: {
    add: props<{ article: ArticleVM }>(),
    addSuccess: props<{ article: Article }>(),
    addFailed: props<{ error: Error }>(),

    getAll: emptyProps(),
    getAllSuccess: props<{ articles: Article[] }>(),
    getAllFailed: props<{ error: Error }>(),

    update: props<{ article: ArticleVM }>(),
    updateSuccess: props<{ article: Article }>(),
    updateFailed: props<{ error: Error }>(),

    getOne: emptyProps(),
    getOneSuccess: props<{ article: Article }>(),
    getOneFailed: props<{ error: Error }>(),
  },
});
