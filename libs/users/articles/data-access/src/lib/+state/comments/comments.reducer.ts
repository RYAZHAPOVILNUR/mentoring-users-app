import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@users/core/data-access';

import { CommentsActions } from './comments.actions';
import { Comment } from '../../models/user-comment.model';

export const commentsFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
  status: LoadingStatus;
  publishStatus: LoadingStatus;
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  sortComparer: (a, b) => {
    return Number(b.created_at) - Number(a.created_at);
  },
});

export const initialCommentsState: CommentsState = commentsAdapter.getInitialState({
  status: 'init',
  publishStatus: 'init',
});

export const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    initialCommentsState,

    on(CommentsActions.loadComments, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(CommentsActions.loadCommentsSuccess, (state, { comments }) =>
      commentsAdapter.setAll(comments, { ...state, status: 'loaded' as const }),
    ),

    on(CommentsActions.loadCommentsFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(CommentsActions.publishComment, (state) => ({
      ...state,
      publishStatus: 'loading' as const,
    })),

    on(CommentsActions.publishCommentSuccess, (state, { comment }) =>
      commentsAdapter.addOne(comment, {
        ...state,
        publishStatus: 'loaded' as const,
      }),
    ),

    on(CommentsActions.publishCommentFailed, (state) => ({
      ...state,
      publishStatus: 'error' as const,
    })),

    on(CommentsActions.deleteComment, (state, { id }) => commentsAdapter.removeOne(id, state)),
  ),
});
