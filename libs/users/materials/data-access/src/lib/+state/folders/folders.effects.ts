import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { withLatestFrom, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@users/core/http';
import { FolderModel } from '../../models/folder.model';
import { selectRouteParams } from '@users/core/data-access';
import * as FoldersActions from './folders.actions';

// Эффект для загрузки конкретной папки по ID из URL
export const loadFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(FoldersActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        const folderId = params?.['id'];
        if (!folderId) return of(FoldersActions.loadFolderFailure({ error: 'ID папки не найден' }));

        return apiService.get<FolderModel>(`/folder/${folderId}`).pipe(
          map((folder) => FoldersActions.loadFolderSuccess({ folder })),
          catchError((error) => {
            console.error('Ошибка загрузки папки:', error);
            return of(FoldersActions.loadFolderFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Эффект для загрузки всех папок
export const loadAllFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadAllFolders),
      switchMap(() =>
        apiService.get<FolderModel[]>(`/folder`).pipe(
          map((folders) => FoldersActions.loadAllFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Ошибка загрузки всех папок:', error);
            return of(FoldersActions.loadAllFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true, dispatch: true }
);
