import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectQueryParams, selectRouteParams } from '@shared/util-store';

import {
  ARTICLE_FEATURE_KEY,
  articlesAdapter,
  articlesFeature,
  ArticlesState,
} from './articles.reducer';

export const selectArticleState =
  createFeatureSelector<ArticlesState>(ARTICLE_FEATURE_KEY);

export const { selectIds, selectStatus } = articlesFeature;

export const { selectAll: selectAllArticles, selectEntities: selectArticleEntities } =
  articlesAdapter.getSelectors(selectArticleState);

export const selectArticleForEdit = createSelector(
  selectQueryParams,
  selectArticleEntities,
  ({ id }, entities) => entities[id] || null,
);

export const selectOpenedArticle = createSelector(
  selectRouteParams,
  selectArticleEntities,
  ({ id }, entities) => entities[id] || null,
);
