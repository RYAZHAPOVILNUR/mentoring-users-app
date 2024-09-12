import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { FoldersActions } from './folders.actions';

import { ApiService } from '@users/core/http';

import { FoldersEntity } from '../folders/folders.reducer';
import { CreateFolderDTO, FolderType } from '@users/core/data-access';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FoldersEntity[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.initFoldersSuccess({ folders }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.initFoldersFailure({ error }));
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
      switchMap(({ folderData }) =>
        apiService.post<FolderType, CreateFolderDTO>('/folder', folderData).pipe(
          map((folderEntity) => FoldersActions.addFolderSuccess({ folder: folderEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailed({ error }));
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
      switchMap(({ folderId }) =>
        apiService.delete<void>(`/folder/${folderId}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ folderId })),
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