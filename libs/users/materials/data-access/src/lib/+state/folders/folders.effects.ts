import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { CreateFolderDTO, FolderDTO } from '../../models/folders.models';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);  

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
            map((folders) =>
            FoldersActions.loadFoldersSuccess({folders})
          ),
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
      // delay(1500),
      switchMap(({ folderData }) =>
        apiService.post<FolderDTO, CreateFolderDTO>('/folder', folderData).pipe(
          // map((folder) => FolderDTO(folder)),
          map((FolderDTO) => FoldersActions.addFolderSuccess({ folderData: FolderDTO })),
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

