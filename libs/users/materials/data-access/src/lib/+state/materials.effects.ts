import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import * as MaterialActions from './materials.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { IFoldersActionSuccess } from '../models/folders/folder-action-success.interface';
import { foldersDTOAdapter } from '../models/folders/folders-dto.adapter';
import { TCreateFoldersDTO, TFoldersDTO } from '../models/folders/folder-dto.model';

export const loadFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialActions.loadFolders),
      switchMap(() =>
        apiService.get<TFoldersDTO[]>('/folder').pipe(
          map((folders) =>
            MaterialActions.loadFolderSuccess({
              folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialActions.loadFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialActions.addFolder),
      switchMap(({ folderData }) =>
        apiService.post<TFoldersDTO, TCreateFoldersDTO>('/folder', folderData).pipe(
          map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
          map((folderEntity) =>
            MaterialActions.addFolderSuccess({
              folderData: folderEntity,
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
