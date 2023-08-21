import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState, commentsAdapter, commentsFeature } from './comments.reducer';

export const { selectCommentsState, selectIds, selectStatus } = commentsFeature

const { selectAll, selectEntities } = commentsAdapter.getSelectors();

export const selectComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectAll(state)
)

export const selectCommentsEntities = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectEntities(state)
);