import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';
import { Article } from '@users/shared/data-access-models';

import { articlesActions } from './articles.actions';

export interface ArticlesState extends EntityState<Article> {
  status: LoadingStatus;
}

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>();

const initialArticlesState: ArticlesState = articlesAdapter.getInitialState({
  status: 'init',
});

export const articlesFeature = createFeature({
  name: 'articles',
  reducer: createReducer(
    initialArticlesState,

    on(articlesActions.add, (state) => ({ ...state, status: 'loading' as const })),

    on(articlesActions.addSuccess, (state, { article }) =>
      articlesAdapter.addOne(article, { ...state, status: 'loaded' as const }),
    ),

    on(articlesActions.addFailed, (state) => ({ ...state, status: 'error' as const })),

    on(articlesActions.getAll, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(articlesActions.getAllSuccess, (state, { articles }) =>
      articlesAdapter.setAll(articles, { ...state, status: 'loaded' as const }),
    ),

    on(articlesActions.getAllFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(articlesActions.update, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(articlesActions.updateSuccess, (state, { article }) =>
      articlesAdapter.updateOne({ id: article.id, changes: article }, { ...state, status: 'loaded' as const }),
    ),

    on(articlesActions.updateFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),
    on(articlesActions.getOne, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(articlesActions.getOneSuccess, (state, { article }) =>
      articlesAdapter.setOne({ ...article }, { ...state, status: 'loaded' as const }),
    ),
    on(articlesActions.getOneFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),
  ),
});
