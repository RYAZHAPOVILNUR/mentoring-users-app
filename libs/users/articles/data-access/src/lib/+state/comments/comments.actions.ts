import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../models/user-comment.model';
import { CreateComment } from '../../models/create-comment.model';

export const CommentsActions = createActionGroup({
  source: 'Comment',
  events: {
    publishComment: props<{ comment: CreateComment }>(),
    publishCommentSuccess: props<{ comment: Comment }>(),
    publishCommentFailed: props<{ error: Error }>(),
    editCommentLike: props<{ comment: CreateComment, commentId: number }>(),
    editCommentLikeSuccess: props<{ comment: Comment }>(),
    editCommentLikeFilure: props<{ error: Error }>(),
    editCommentDisLike: props<{ comment: CreateComment, commentId: number }>(),
    editCommentDisLikeSuccess: props<{ comment: Comment }>(),
    editCommentDisLikeFilure: props<{ error: Error }>(),
    loadComments: props<{ articleId: number }>(),
    loadCommentsSuccess: props<{ comments: Comment[] }>(),
    loadCommentsFailed: props<{ error: Error }>(),
    deleteComment: props<{ id: number }>(),
    deleteCommentSuccess: props<{ id: number }>(),
    deleteCommentFailed: props<{ error: Error }>(),
  },
});
