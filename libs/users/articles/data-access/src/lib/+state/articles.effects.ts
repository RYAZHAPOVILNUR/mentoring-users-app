import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticlesActions } from './articles.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '@users/core/http';
import { CreateArticle } from '../models/create-article.model';
import { Router } from "@angular/router";
import { Article } from '../models/article.model';
import { Store } from '@ngrx/store';
import { selectQueryParam, selectQueryParams, selectRouteParams } from '@users/core/data-access';

export const publishArticle$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService),
    router = inject(Router)) => {
    return actions$.pipe(
      ofType(ArticlesActions.publishArticle),
      switchMap(
        ({ article }) => apiService.post<void, CreateArticle>('/articles', article).pipe(
          tap(() => router.navigate(['/articles'])),
          map(() => ArticlesActions.publishArticleSuccess),
          catchError((error) => {
            console.error('Error', error);
            return of(ArticlesActions.publishArticleFailed({ error }))
          })
        )
      )
    )
  }, { functional: true, dispatch: false }
)

export const loadArticles$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      switchMap(
        () => apiService.get<Article[]>('/articles')
          .pipe(
            map(
              (articles) => ArticlesActions.loadArticlesSuccess({ articles })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(ArticlesActions.loadArticlesFailed({ error }))
            })
          )
      )
    )
  }, { functional: true }
)
export const getArticle$ = createEffect(
  (actions$ = inject(Actions),
    apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(ArticlesActions.getArticle),
      switchMap(
        ({id}) => {
          return apiService.get<Article>(`/articles/${id}`).pipe(
            map(
              (article) => ArticlesActions.getArticleSuccess({ article })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(ArticlesActions.getArticlesFailed({error}))
            })
          )
        }
      )
    )
  }, {functional: true}
)
