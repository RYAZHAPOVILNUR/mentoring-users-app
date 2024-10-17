import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { foldersActions } from './folders.actions';

import { ApiService } from '@users/core/http';

import { FoldersEntity } from '../folders/folders.reducer';
import { CreateFolderDTO, FolderType } from '@users/core/data-access';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.initFolders),
      switchMap(() =>
        apiService.get<FoldersEntity[]>('/folder').pipe(
          map((folders) =>
            foldersActions.initFoldersSuccess({ folders }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.initFoldersFailure({ error }));
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
      ofType(foldersActions.addFolder),
      switchMap(({ folderData }) =>
        apiService.post<FolderType, CreateFolderDTO>('/folder', folderData).pipe(
          map((folderEntity) => foldersActions.addFolderSuccess({ folder: folderEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.addFolderFailed({ error }));
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
      ofType(foldersActions.deleteFolder),
      switchMap(({ folderId }) =>
        apiService.delete<void>(`/folder/${folderId}`).pipe(
          map(() => foldersActions.deleteFolderSuccess({ folderId })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);