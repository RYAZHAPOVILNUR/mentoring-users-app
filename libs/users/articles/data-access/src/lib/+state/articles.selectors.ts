import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState, articlesAdapter, articlesFeature } from './articles.reducer';
import { selectQueryParams } from '@users/core/data-access';

export const { selectArticlesState, selectIds, selectStatus } = articlesFeature

const { selectAll, selectEntities } = articlesAdapter.getSelectors();

export const selectArticles = createSelector(
  selectArticlesState,
  (state: ArticlesState) => selectAll(state)
)

export const selectArticlesEntities = createSelector(
  selectArticlesState,
  (state: ArticlesState) => selectEntities(state)
);

export const selectArticleForEdit = createSelector(
  selectQueryParams,
  selectArticlesEntities,
  ({ id }, entities) => entities[id] || null
)

