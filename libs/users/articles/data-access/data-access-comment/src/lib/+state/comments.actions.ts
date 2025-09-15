import { createActionGroup, props } from '@ngrx/store';
import { Comment } from '@users/shared/data-access-models';

import { CreateComment } from '../interface/create-comment.interface';

export const commentsActions = createActionGroup({
  source: 'Comment',
  events: {
    publishComment: props<{ comment: CreateComment }>(),
    publishCommentSuccess: props<{ comment: Comment }>(),
    publishCommentFailed: props<{ error: Error }>(),
    loadComments: props<{ articleId: number }>(),
    loadCommentsSuccess: props<{ comments: Comment[] }>(),
    loadCommentsFailed: props<{ error: Error }>(),
    deleteComment: props<{ id: number }>(),
    deleteCommentSuccess: props<{ id: number }>(),
    deleteCommentFailed: props<{ error: Error }>(),
  },
});
