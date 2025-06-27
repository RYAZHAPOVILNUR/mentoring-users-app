import { createSelector } from '@ngrx/store';

import { selectQueryParams, selectRouteParams } from '@users/core/data-access';

import { articlesAdapter, articlesFeature, ArticlesState } from './articles.reducer';

export const { selectArticlesState, selectIds, selectStatus } = articlesFeature;

const { selectAll, selectEntities } = articlesAdapter.getSelectors();

export const selectArticles = createSelector(selectArticlesState, (state: ArticlesState) => selectAll(state));

export const selectArticlesEntities = createSelector(selectArticlesState, (state: ArticlesState) =>
  selectEntities(state),
);

export const selectArticleForEdit = createSelector(
  selectQueryParams,
  selectArticlesEntities,
  ({ id }, entities) => entities[id] || null,
);

export const selectOpenedArticle = createSelector(
  selectRouteParams,
  selectArticlesEntities,
  ({ id }, entities) => entities[id] || null,
);
