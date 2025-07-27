import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';
import { Comment } from '@users/shared/data-access-models';

import { commentsActions } from './comments.actions';

export interface CommentsState extends EntityState<Comment> {
  status: LoadingStatus;
  publishStatus: LoadingStatus;
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  sortComparer: (a, b) => {
    return Number(b.created_at) - Number(a.created_at);
  },
});

const initialCommentsState: CommentsState = commentsAdapter.getInitialState({
  status: 'init',
  publishStatus: 'init',
});

export const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    initialCommentsState,

    on(commentsActions.loadComments, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(commentsActions.loadCommentsSuccess, (state, { comments }) =>
      commentsAdapter.setAll(comments, { ...state, status: 'loaded' as const }),
    ),

    on(commentsActions.loadCommentsFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

    on(commentsActions.publishComment, (state) => ({
      ...state,
      publishStatus: 'loading' as const,
    })),

    on(commentsActions.publishCommentSuccess, (state, { comment }) =>
      commentsAdapter.addOne(comment, {
        ...state,
        publishStatus: 'loaded' as const,
      }),
    ),

    on(commentsActions.publishCommentFailed, (state) => ({
      ...state,
      publishStatus: 'error' as const,
    })),

    on(commentsActions.deleteComment, (state, { id }) => commentsAdapter.removeOne(id, state)),
  ),
});
