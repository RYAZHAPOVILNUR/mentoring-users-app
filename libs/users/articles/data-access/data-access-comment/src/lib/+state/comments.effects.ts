import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { AuthFacade } from '@users/core/data-access-auth';
import { Comment } from '@users/shared/data-access-models';
import { ApiService } from '@core/data-access-api';
import { selectRouteParam } from '@shared/util-store';

import { CreateComment } from '../interface/create-comment.interface';

import { commentsActions } from './comments.actions';

export const add$ = createEffect(
  (
    actions$ = inject(Actions),
    auth$ = inject(AuthFacade),
    apiService = inject(ApiService),
  ) => {
    return actions$.pipe(
      ofType(commentsActions.add),
      withLatestFrom(auth$.user$),
      switchMap(([{ comment }, user]) => {
        console.log(user);

        const author = {
          id: user.id,
          name: user.name,
          username: user.username,
          photo: {
            url: user.photo!.url,
          },
        };

        return apiService.post<Comment, CreateComment>('/comments', comment).pipe(
          map((comment) =>
            commentsActions.addSuccess({ comment: { ...comment, author } }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.addFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getAll$ = createEffect(
  () => {
    const store = inject(Store);
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const articleId$ = store.select(selectRouteParam('id'));
    return actions$.pipe(
      ofType(commentsActions.getAll),
      withLatestFrom(articleId$),
      filter(([, articleId]) => Boolean(Number(articleId))),
      map(([, articleId]) => Number(articleId)),
      switchMap((articleId) => {
        return apiService.get<Comment[]>(`/commentsByArticle/${articleId}`).pipe(
          tap((comments) => console.log(comments)),
          map((comments) => commentsActions.getAllSuccess({ comments })),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.getAllFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
export const delete$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(commentsActions.delete),
      switchMap(({ id }) => {
        return apiService.delete<number>(`/comments/${id}`).pipe(
          map(() => commentsActions.deleteSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(commentsActions.deleteFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
