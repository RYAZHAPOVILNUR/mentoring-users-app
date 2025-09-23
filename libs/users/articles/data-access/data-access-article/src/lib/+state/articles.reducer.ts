import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Article } from '@users/shared/data-access-models';
import { LoadingStatus } from '@shared/util-store';

import { articlesActions } from './articles.actions';

export const ARTICLE_FEATURE_KEY = 'articles';

export interface ArticlesState extends EntityState<Article> {
  status: LoadingStatus;
}

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>();

const initialArticlesState: ArticlesState = articlesAdapter.getInitialState({
  status: 'init',
});

export const articlesFeature = createFeature({
  name: ARTICLE_FEATURE_KEY,
  reducer: createReducer(
    initialArticlesState,
    on(articlesActions.addArticle, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(articlesActions.addArticleSuccess, (state, { article }) =>
      articlesAdapter.addOne({ ...article }, { ...state, status: 'loaded' as const }),
    ),
    on(articlesActions.addArticleFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

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

    on(articlesActions.updateArticle, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(articlesActions.updateArticleSuccess, (state, { article }) =>
      articlesAdapter.updateOne(
        { id: article.id, changes: article },
        { ...state, status: 'loaded' as const },
      ),
    ),
    on(articlesActions.updateArticleFailed, (state) => ({
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
