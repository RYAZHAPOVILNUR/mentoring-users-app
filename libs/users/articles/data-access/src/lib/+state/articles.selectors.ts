import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState, articlesAdapter, articlesFeature } from './articles.reducer';

export const { selectArticlesState, selectEntities, selectIds, selectStatus } = articlesFeature

const { selectAll } = articlesAdapter.getSelectors();

export const selectArticles = createSelector(
  selectArticlesState,
  (state: ArticlesState) => selectAll(state)
)
