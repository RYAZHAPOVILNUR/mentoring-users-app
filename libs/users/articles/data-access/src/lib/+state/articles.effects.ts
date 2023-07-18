import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { articlesActions } from './articles.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '@users/core/http';
import { CreateArticle } from '../models/createArticle.model';

export const publishArticle$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.publishArticle),
      switchMap(
        ({ article }) => apiService.post<void, CreateArticle>('/articles', article).pipe(
          tap(() => console.log('from effects')),
          map(() => articlesActions.publishArticleSuccess),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.publishArticleFailed({ error }))
          })
        )
      )
    )
  }, { functional: true, dispatch: false }
)
