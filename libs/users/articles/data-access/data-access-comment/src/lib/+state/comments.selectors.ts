import { createFeatureSelector } from '@ngrx/store';

import {
  COMMENTS_FEATURE_KEY,
  commentsAdapter,
  commentsFeature,
  CommentsState,
} from './comments.reducer';

export const { selectIds, selectStatus } = commentsFeature;

export const selectCommentState =
  createFeatureSelector<CommentsState>(COMMENTS_FEATURE_KEY);

export const { selectAll: selectAllComments } =
  commentsAdapter.getSelectors(selectCommentState);
