import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticlesActions } from './articles.actions';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '@users/core/http';
import { CreateArticle } from '../models/create-article.model';
import { Router } from '@angular/router';
import { Article } from '../models/article.model';
import { Store, select } from '@ngrx/store';
import { selectQueryParam, selectQueryParams, selectRouteParams } from '@users/core/data-access';
import { selectArticles, selectArticlesEntities } from './articles.selectors';

export const publishArticle$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ArticlesActions.publishArticle),
      switchMap(({ article }) =>
        apiService.post<void, CreateArticle>('/articles', article).pipe(
          tap(() => router.navigate(['/articles'])),
          map(() => ArticlesActions.publishArticleSuccess),
          catchError((error) => {
            return of(ArticlesActions.publishArticleFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true, dispatch: false }
);

export const loadArticles$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      switchMap(() =>
        apiService.get<Article[]>('/articles').pipe(
          map((articles) => ArticlesActions.loadArticlesSuccess({ articles })),
          catchError((error) => {
            return of(ArticlesActions.loadArticlesFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
export const getArticleForEdit$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(ArticlesActions.getArticleForEdit),
      switchMap(({ id }) => {
        return apiService.get<Article>(`/articles/${id}`).pipe(
          map((article) => ArticlesActions.getArticleForEditSuccess({ article })),
          catchError((error) => {
            return of(ArticlesActions.getArticleForEditFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const getArticleForRead$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(ArticlesActions.getArticleForRead),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<Article>(`/articles/${params['id']}`).pipe(
          map((article) => ArticlesActions.getArticleForReadSuccess({ article })),
          catchError((error) => {
            return of(ArticlesActions.getArticleForReadFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const editArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesEntities$ = inject(Store).pipe(select(selectArticlesEntities)),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(ArticlesActions.editArticle),
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
          map(({ articles }) => ArticlesActions.editArticleSuccess({ articles })),
          catchError((error) => {
            return of(ArticlesActions.editArticleFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
