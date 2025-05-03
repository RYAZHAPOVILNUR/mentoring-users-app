import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import * as FoldersActions from '../../../../data-access/src/lib/+state/folders.actions'
import { catchError, map, of, switchMap } from 'rxjs';
import { FoldersModel, FoldersSecondModel } from '../../../../folders-model';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FoldersSecondModel[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.loadFoldersSuccess({ folders })),

          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
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
      ofType(FoldersActions.deleteFolder),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailed({ error }));
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
      ofType(FoldersActions.addFolder),
      switchMap(({ folder } ) =>
        apiService.post<FoldersSecondModel, FoldersModel>('/folder', folder).pipe(
          map((folder) => FoldersActions.addFolderSuccess({ folder })),
          catchError((error) => {
            return of(FoldersActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
