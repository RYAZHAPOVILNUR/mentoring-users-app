import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentsActions } from './comments.actions';
import { LoadingStatus } from '@users/core/data-access';
import { Comment } from '../../models/user-comment.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const commentsFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
  status: LoadingStatus
}

export const commentsAdapter: EntityAdapter<Comment> =
  createEntityAdapter<Comment>();

export const initialCommentsState: CommentsState = commentsAdapter.getInitialState({
  status: 'init'
})

export const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    initialCommentsState,

    on(CommentsActions.loadComments, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(CommentsActions.loadCommentsSuccess, (state, { comments }) =>
      commentsAdapter.setAll(comments, { ...state, status: 'loaded' as const })
    ),

    on(CommentsActions.loadCommentsFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),

    on(CommentsActions.deleteComment, (state, { id }) => 
      commentsAdapter.removeOne(id, state)
    )
  )
});

