import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TAddFolder, TFolder } from '../../models/folder.type';

import { ApiService } from '@users/core/http';
import { map, switchMap, catchError, of } from 'rxjs';
import * as FoldersActions from './folders.actions';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<TFolder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(FoldersActions.loadFoldersFailure({ error })))
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
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => of(FoldersActions.deleteFolderFailed({ error })))
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
      switchMap((title) =>
        apiService.post<TFolder, TAddFolder>('/folder', title).pipe(
          map((folder) => FoldersActions.addFolderSuccess({ folder })),
          catchError((error) => of(FoldersActions.addFolderFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);
