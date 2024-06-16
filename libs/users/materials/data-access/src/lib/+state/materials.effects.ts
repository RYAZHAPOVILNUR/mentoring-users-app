import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { MaterialStatus } from '../enums/materials-status.enum';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) =>
            MaterialsActions.loadFoldersSuccess({
              folders,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(
              MaterialsActions.loadFoldersFailure({
                status: MaterialStatus.Error,
                error,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService
          .delete<void>(`/folder/${id}`)
          .pipe(map(() => MaterialsActions.deleteFolderSuccess({ id })))
      ),
      catchError((error) => {
        console.error(error);
        return of(MaterialsActions.deleteFolderFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const createFolder$ = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(MaterialsActions.createFolder),
    switchMap(({ folder }) => apiService.post())
  );
});
