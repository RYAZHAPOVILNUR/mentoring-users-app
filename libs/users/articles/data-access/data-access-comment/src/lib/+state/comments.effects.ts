import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { AuthStore } from '@users/core/data-access-auth';
import { Comment } from '@users/shared/data-access-models';

import { commentsActions } from './comments.actions';
import { CreateComment } from '../interface/create-comment.interface';

export const publishComment$ = createEffect(
  (actions$ = inject(Actions), auth$ = inject(AuthStore), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(commentsActions.publishComment),
      withLatestFrom(toObservable(auth$.loggedUser)),
      switchMap(([{ comment }, user]) => {
        console.log(user);

        const author = user
          ? {
              id: user.id,
              name: user.name,
              username: user.username,
              photo: {
                url: user.photo!.url,
              },
            }
          : null;

        return apiService.post<Comment, CreateComment>('/comments', comment).pipe(
          map((comment) =>
            commentsActions.publishCommentSuccess({
              comment: { ...comment, author },
            }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.publishCommentFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadComments$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(commentsActions.loadComments),
      switchMap(({ articleId }) =>
        apiService.get<Comment[]>(`/commentsByArticle/${articleId}`).pipe(
          map((comments) => commentsActions.loadCommentsSuccess({ comments })),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.loadCommentsFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
export const deleteComment$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(commentsActions.deleteComment),
      switchMap(({ id }) => {
        return apiService.delete<number>(`/comments/${id}`).pipe(
          map(() => commentsActions.deleteCommentSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.deleteCommentFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
