import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { foldersActions } from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddFolderType, FolderType } from '../models/folder.type';

export const addFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.addFolders),
      switchMap(({ title }) =>
        apiService.post<FolderType, AddFolderType>('/folder', title).pipe(
          map((folder) => foldersActions.addFoldersSuccess({ folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.addFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.loadFolders),
      switchMap(() =>
        apiService.get<FolderType[]>('/folder').pipe(
          map((folders) => {
            return foldersActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.loadFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.deleteFolders),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => foldersActions.deleteFoldersSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.deleteFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
