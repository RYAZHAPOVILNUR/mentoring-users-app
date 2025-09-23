import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Comment } from '@users/shared/data-access-models';
import { LoadingStatus } from '@shared/util-store';

import { commentsActions } from './comments.actions';

export interface CommentsState extends EntityState<Comment> {
  status: LoadingStatus;
}
export const COMMENTS_FEATURE_KEY = 'comments';

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

const initialCommentsState: CommentsState = commentsAdapter.getInitialState({
  status: 'init',
});

export const commentsFeature = createFeature({
  name: COMMENTS_FEATURE_KEY,
  reducer: createReducer(
    initialCommentsState,

    on(commentsActions.add, (state) => ({ ...state, status: 'loading' as const })),

    on(commentsActions.addSuccess, (state, { comment }) =>
      commentsAdapter.addOne(comment, { ...state, status: 'loaded' as const }),
    ),

    on(commentsActions.addFailed, (state) => ({ ...state, status: 'error' as const })),

    on(commentsActions.getAll, (state) => ({ ...state, status: 'loading' as const })),

    on(commentsActions.getAllSuccess, (state, { comments }) =>
      commentsAdapter.setAll(comments, { ...state, status: 'loaded' as const }),
    ),

    on(commentsActions.getAllFailed, (state) => ({ ...state, status: 'error' as const })),

    on(commentsActions.delete, (state, { id }) => commentsAdapter.removeOne(id, state)),
  ),
});
