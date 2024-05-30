import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { foldersActions } from './folders.actions';
import { catchError, of, switchMap } from 'rxjs';
import { Folder } from '../../interfaces/folder.interface';
import { map } from 'rxjs/operators';
import { FolderCreate } from '../../types/folder-create.type';

export const loadFolders$ = createEffect(
  (actions$ = inject(Actions),
   apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(foldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => foldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const createFolder$ = createEffect((
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => actions$.pipe(
    ofType(foldersActions.createFolder),
    switchMap(({ title }) => {
      return apiService.post<Folder, FolderCreate>('/folder', { title }).pipe(
        map((folder) => foldersActions.createFolderSuccess({ folder })),
        catchError((error) => {
          console.error('Error', error);
          return of(foldersActions.createFolderFailure({ error }));
        })
      );
    })
  ),
  { functional: true }
);

export const deleteFolder$ = createEffect((
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => actions$.pipe(
    ofType(foldersActions.deleteFolder),
    switchMap(({ id }) =>
      apiService.delete<null>(`/folder/${id}`).pipe(
        map(() => foldersActions.deleteFolderSuccess({ id })),
        catchError((error) => {
          console.error('Error', error);
          return of(foldersActions.deleteFolderFailure({ error }));
        })
      )
    )
  ),
  { functional: true }
);


