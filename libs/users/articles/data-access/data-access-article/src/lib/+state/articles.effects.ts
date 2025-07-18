import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';
import { Article } from '@users/shared/data-access-models';

import { articlesActions } from './articles.actions';
import { selectArticlesEntities } from './articles.selectors';
import { CreateArticle } from '../interfaces/create-article.interface';

export const publishArticle$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articlesActions.publishArticle),
      switchMap(({ article }) =>
        apiService.post<void, CreateArticle>('/articles', article).pipe(
          tap(() => router.navigate(['/articles'])),
          map(() => articlesActions.publishArticleSuccess),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.publishArticleFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true, dispatch: false },
);

export const loadArticles$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.loadArticles),
      switchMap(() =>
        apiService.get<Article[]>('/articles').pipe(
          map((articles) => articlesActions.loadArticlesSuccess({ articles })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.loadArticlesFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
export const getArticleForEdit$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.getArticleForEdit),
      switchMap(({ id }) => {
        return apiService.get<Article>(`/articles/${id}`).pipe(
          map((article) => articlesActions.getArticleForEditSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.getArticleForEditFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getArticleForRead$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(articlesActions.getArticleForRead),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<Article>(`/articles/${params['id']}`).pipe(
          map((article) => articlesActions.getArticleForReadSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.getArticleForReadFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const editArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesEntities$ = inject(Store).pipe(select(selectArticlesEntities)),
    apiService = inject(ApiService),
  ) => {
    return actions$.pipe(
      ofType(articlesActions.editArticle),
      withLatestFrom(articlesEntities$),
      filter(([{ id }, articlesEntities$]) => Boolean(articlesEntities$[id])),
      map(([{ articleData, id }, articlesEntities$]) => ({
        article: {
          ...articlesEntities$[id],
          articlesId: id,
          title: articleData.title,
          content: articleData.content,
        },
      })),
      switchMap(({ article }) =>
        apiService.post<Article, CreateArticle>(`/articles/${article.id}`, article).pipe(
          map((articles) => ({ articles })),
          map(({ articles }) => articlesActions.editArticleSuccess({ articles })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.editArticleFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
