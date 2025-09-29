import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectQueryParams, selectRouteParams } from '@shared/util-store';

import { articlesAdapter, articlesFeature, ArticlesState } from './articles.reducer';

export const selectArticleState = createFeatureSelector<ArticlesState>(articlesFeature.name);

export const { selectIds, selectStatus } = articlesFeature;

export const { selectAll: selectAllArticles, selectEntities: selectArticlesEntities } =
  articlesAdapter.getSelectors(selectArticleState);

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
