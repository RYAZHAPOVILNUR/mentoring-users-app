import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import * as FolderActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { AddFoldersType, FoldersType } from '../models/folder.type';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FolderActions.initFolders),
      switchMap(() =>
        apiService.get<FoldersType[]>('/folder').pipe(
          map((folders) => {
            return FolderActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            return of(FolderActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FolderActions.deleteFolder),
      delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FolderActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            return of(FolderActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FolderActions.addFolder),
      delay(1500),
      switchMap((title) =>
        apiService.post<FoldersType, AddFoldersType>('/folder', title).pipe(
          map((folder) => FolderActions.addFolderSuccess({ folder })),
          catchError((error) => {
            return of(FolderActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);