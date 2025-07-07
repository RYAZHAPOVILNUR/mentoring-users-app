import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { githubApiActions } from './github-api.actions';
import { GithubApiService } from '../services/github-api.service';

export const getAccessTokenEffect$ = createEffect(
  (githubApiService = inject(GithubApiService), actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(githubApiActions.getAccessToken),
      switchMap(({ code }) =>
        githubApiService.getAccessToken(code).pipe(
          map(({ token }) => {
            return githubApiActions.getAccessTokenSuccess({ token });
          }),
          catchError((error) => of(githubApiActions.getAccessTokenFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getAccessTokenSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), githubApiService = inject(GithubApiService), store = inject(Store)) =>
    actions$.pipe(
      ofType(githubApiActions.getAccessTokenSuccess),
      tap(({ token }) => {
        githubApiService.accessToken.next(token);
        githubApiService.setStoredAccessToken(token);
        store.dispatch(githubApiActions.getGithubUser({ token }));
      }),
    ),
  { functional: true, dispatch: false },
);

export const getGithubUserEffect$ = createEffect(
  (actions$ = inject(Actions), githubApiService = inject(GithubApiService)) =>
    actions$.pipe(
      ofType(githubApiActions.getGithubUser),
      switchMap(({ token }) =>
        githubApiService.getGithubUser(token).pipe(
          map((user) => githubApiActions.getGithubUserSuccess({ user })),
          catchError((error) => of(githubApiActions.getGithubUserFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
