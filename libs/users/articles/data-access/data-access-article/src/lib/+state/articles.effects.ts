import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { Article } from '@users/shared/data-access-models';
import { ApiService } from '@core/data-access-api';
import { selectQueryParam, selectRouteParam } from '@shared/util-store';

import { ArticleVM } from '../types/article-vm.interface';
import { UpdateArticleDTO } from '../types/update-article.type';

import { articlesActions } from './articles.actions';

export const add$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.addArticle),
      switchMap(({ article }) => {
        return apiService.post<Article, ArticleVM>('/articles', article).pipe(
          tap((art: Article) => console.log('addArticle', art)),
          map((article) => articlesActions.addArticleSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.addArticleFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getAll$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(articlesActions.getAll),
      switchMap(() =>
        apiService.get<Article[]>('/articles').pipe(
          map((articles) => articlesActions.getAllSuccess({ articles })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.getAllFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const update$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    apiService = inject(ApiService),
  ) => {
    const id$ = store$.select(selectQueryParam('id'));

    return actions$.pipe(
      ofType(articlesActions.updateArticle),
      withLatestFrom(id$),
      filter(([, idParam]) => Boolean(Number(idParam))),
      switchMap(([{ article }, idParam]) => {
        const articleId = Number(idParam);

        const articleData: UpdateArticleDTO = {
          articlesId: articleId,
          title: article.title,
          content: article.content,
        };
        return apiService
          .post<Article, UpdateArticleDTO>(`/articles/${articleId}`, articleData)
          .pipe(
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

export const getOne$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    const idFromQuery$ = store.select(selectQueryParam('id'));
    const idFromRoute$ = store.select(selectRouteParam('id'));

    return actions$.pipe(
      ofType(articlesActions.getOne),
      withLatestFrom(idFromQuery$, idFromRoute$),
      filter(([, idFromQuery, idFromRoute]) =>
        Boolean(Number(idFromQuery || idFromRoute)),
      ),
      map(([, idFromQuery, idFromRoute]) => Number(idFromQuery || idFromRoute)),
      switchMap((articleId) => {
        return apiService.get<Article>(`/articles/${articleId}`).pipe(
          map((article) => articlesActions.getOneSuccess({ article })),
          catchError((error) => {
            console.error('Error', error);
            return of(articlesActions.getOneFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
