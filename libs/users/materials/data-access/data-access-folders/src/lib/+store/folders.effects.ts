import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { CreateFolder, Folder } from '@users/ui-folders';

import { FoldersActions } from './folders.actions';

export const loadFoldersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() => apiService.get<Folder[]>('/folder')),
      map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
      catchError(() => of(FoldersActions.loadFoldersFailure())),
    );
  },
  { functional: true },
);

export const deleteFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      mergeMap(({ id }) =>
        apiService.delete<Folder>(`/folder/${id}`).pipe(
          map(() => {
            return id;
          }),
        ),
      ),
      map((deletedFolderId) => FoldersActions.deleteFolderSuccess({ deletedFolderId })),
      catchError(() => of(FoldersActions.deleteFolderFailure())),
    );
  },
  { functional: true },
);

export const createFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.createFolder),
      mergeMap((title) => apiService.post<Folder, CreateFolder>('/folder', title.title)),
      map((createdFolder) => FoldersActions.createFolderSuccess({ createdFolder })),
      catchError(() => of(FoldersActions.createFolderFailure())),
    );
  },
  { functional: true },
);
