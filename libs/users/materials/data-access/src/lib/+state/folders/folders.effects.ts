import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import * as MaterialsFoldersActions from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { folderDtoAdapter } from '../../models/folders/folder-dto.adapter';
import { TCreateFolderDTO, TFolderDTO } from '../../models/folders/folder-dto.model';

export const loadFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsFoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<TFolderDTO[]>('/folder').pipe(
          map((folders) =>
            MaterialsFoldersActions.loadFolderSuccess({
              folders: folders.map((folder) => folderDtoAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsFoldersActions.loadFolderFailure({ error }));
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
      ofType(MaterialsFoldersActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsFoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsFoldersActions.deleteFolderFailed({ error }));
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
      ofType(MaterialsFoldersActions.addFolder),
      switchMap(({ folderData }) =>
        apiService.post<TFolderDTO, TCreateFolderDTO>('/folder', folderData).pipe(
          map((folder) => folderDtoAdapter.DTOtoEntity(folder)),
          map((folderEntity) =>
            MaterialsFoldersActions.addFolderSuccess({
              folderData: folderEntity,
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsFoldersActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
