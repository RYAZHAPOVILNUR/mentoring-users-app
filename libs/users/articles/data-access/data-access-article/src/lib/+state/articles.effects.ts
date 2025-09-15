import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from '@shared/util-store';
import { Article } from '@users/shared/data-access-models';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { articlesActions } from './articles.actions';
import * as articleSelectors from './articles.selectors';
import { CreateArticle } from '../interfaces/create-article.interface';

export const addArticle$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.addArticle),
      switchMap(({ article }) =>
        apiService.post<Article, CreateArticle>('/articles', article).pipe(
          map((article) => articlesActions.addArticleSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.addArticleFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
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

export const updateArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    articlesEntities$ = inject(Store).pipe(select(articleSelectors.selectArticleEntities)),
    apiService = inject(ApiService),
  ) => {
    const id$ = store$.select(selectQueryParam('id'));

    return actions$.pipe(
      ofType(articlesActions.updateArticle),
      withLatestFrom(articlesEntities$, id$),
      filter(([, , idParam]) => Boolean(idParam)),
      switchMap(([{ article }, entities, idParam]) => {
        const articleId = Number(idParam);
        const articleData = {
          ...entities[articleId],
          articlesId: articleId,
          title: article.title,
          content: article.content,
        };
        return apiService.post<Article, CreateArticle>(`/articles/${articleData.id}`, articleData).pipe(
          map((article) => articlesActions.updateArticleSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.updateArticleFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadArticle$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    const id$ = store.select(selectQueryParam('id'));
    return actions$.pipe(
      ofType(articlesActions.loadArticle),
      withLatestFrom(id$),
      filter(([, idParam]) => Boolean(idParam)),
      switchMap(([, idParam]) => {
        const articleId = Number(idParam);
        return apiService.get<Article>(`/articles/${articleId}`).pipe(
          map((article) => articlesActions.loadArticleSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.loadArticleFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
