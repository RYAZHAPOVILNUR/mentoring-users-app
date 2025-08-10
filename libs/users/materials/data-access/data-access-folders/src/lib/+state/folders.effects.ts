import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';

import { foldersActions } from './folders.actions';
import { CreateFolder, Folder } from '../interfaces/create-folder.interface';

export const publishFolder$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.publishFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
          map((folder) => foldersActions.publishFolderSuccess({ folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.publishFolderFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadFolders$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.loadFolders, foldersActions.publishFolderSuccess),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => foldersActions.loadFoldersSuccess({ folders: folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.loadFoldersFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const getFolderForMaterials$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.getFolderForMaterials),
      concatLatestFrom(() => store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (!params['id']) {
          return of(foldersActions.noCustomerFolder());
        } else {
          return apiService.get<Folder>(`/folder/${params['id']}`).pipe(
            map((folder) => foldersActions.getFolderForMaterialsSuccess({ folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(foldersActions.getFolderForMaterialsFailed({ error }));
            }),
          );
        }
      }),
    );
  },
  { functional: true },
);

export const deleteFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.deleteFolder),
      switchMap(({ folder_id }) =>
        apiService.delete<number>(`/folder/${folder_id}`).pipe(
          map(() => foldersActions.deleteFolderSuccess({ folder_id })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.deleteFolderFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
