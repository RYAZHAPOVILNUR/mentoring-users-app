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

    on(articlesActions.loadArticles, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(articlesActions.loadArticlesSuccess, (state, { articles }) =>
      articlesAdapter.setAll(articles, { ...state, status: 'loaded' as const }),
    ),
    on(articlesActions.editArticleSuccess, (state, { articles }) =>
      articlesAdapter.updateOne(
        {
          id: articles.id,
          changes: articles,
        },
        state,
      ),
    ),
    on(articlesActions.loadArticlesFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(articlesActions.getArticleForEdit, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(articlesActions.getArticleForEditSuccess, (state, { article }) =>
      articlesAdapter.addOne({ ...article }, { ...state, status: 'loaded' as const }),
    ),

    on(articlesActions.getArticleForRead, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(articlesActions.getArticleForReadSuccess, (state, { article }) =>
      articlesAdapter.addOne({ ...article }, { ...state, status: 'loaded' as const }),
    ),
  ),
});
