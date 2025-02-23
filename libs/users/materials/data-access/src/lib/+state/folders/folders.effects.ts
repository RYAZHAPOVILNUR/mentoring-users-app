import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import * as MaterialsFoldersActions from './folders.actions';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { folderDTOAdapter } from '../../models/folders/folder-dto.adapter';
import { TCreateFolderDTO, TFolderDTO } from '../../models/folders/folder-dto.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsFoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<TFolderDTO[]>('/folder').pipe(
          map((folders) =>
            MaterialsFoldersActions.loadFoldersSuccess({
              folders: folders.map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsFoldersActions.loadFoldersFailure({ error }));
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
          map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
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

export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsFoldersActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, param]) => !!Number(param['id'])),
      switchMap(([, param]) => {
        return apiService.get<TFolderDTO>(`/folder/${param['id']}`).pipe(
          map((folder) => folderDTOAdapter.DTOtoEntity(folder)),
          map((folderEntity) => MaterialsFoldersActions.loadFolderSuccess({ folder: folderEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsFoldersActions.loadFolderFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
