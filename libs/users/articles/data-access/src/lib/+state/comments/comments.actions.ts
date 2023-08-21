import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Comment } from "../../models/user-comment.model";
import { CreateComment } from "../../models/create-comment.model";

export const CommentsActions = createActionGroup({
  source: 'Comment',
  events: {
    publishComment: props<{ comment: CreateComment }>(),
    publishCommentSuccess: emptyProps(),
    publishCommentFailed: props<{ error: Error }>(),
    loadComments: emptyProps(),
    loadCommentsSuccess: props<{comments: Comment[]}>(),
    loadCommentsFailed: props<{ error: Error }>(),
    deleteComment: props<{ id: number }>(),
    deleteCommentSuccess: props<{ id: number }>(),
    deleteCommentFailed: props<{ error: Error }>(),
  },
});
