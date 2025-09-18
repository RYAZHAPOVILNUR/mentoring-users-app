import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '@core/data-access-api';

import { FoldersActions } from './folders.actions';
import { AddFolder, Folder } from '../interface/folders.interface';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error: HttpErrorResponse) => {
            return of(FoldersActions.loadFoldersFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const addFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, AddFolder>('/folder', folder).pipe(
          map((newFolder) => FoldersActions.addFolderSuccess({ folder: newFolder })),
          catchError((error: HttpErrorResponse) => {
            return of(FoldersActions.addFolderFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error: HttpErrorResponse) => {
            return of(FoldersActions.deleteFolderFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const openFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.openFolder),
      switchMap(({ id }) =>
        apiService.get<Folder>(`/folder/${id}`).pipe(
          map((folder) => FoldersActions.openFolderSuccess({ folder })),
          catchError((error: HttpErrorResponse) => {
            return of(FoldersActions.openFolderFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
