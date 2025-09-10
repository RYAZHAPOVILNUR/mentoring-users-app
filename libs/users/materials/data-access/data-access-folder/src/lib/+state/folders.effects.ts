import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { foldersActions } from './folders.actions';
import { CreateFolder } from '../interfaces/create-folder.interface';
import { Folder } from '../interfaces/folder.interface';

export const publishFolder$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.publishFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
          map((folder) => foldersActions.publishFolderSuccess({ folder })),
          catchError((error: HttpErrorResponse) => {
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
      ofType(foldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => foldersActions.loadFoldersSuccess({ folders })),
          catchError((error: HttpErrorResponse) => {
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
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),
      switchMap(([, { id: folder_id }]) => {
        return apiService.get<Folder>(`/folder/${folder_id}`).pipe(
          map((folder) => foldersActions.getFolderForMaterialsSuccess({ folder })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(foldersActions.getFolderForMaterialsFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteFolder$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.deleteFolder),
      switchMap(({ folderId }) =>
        apiService.delete(`/folder/${folderId}`).pipe(
          map(() => foldersActions.deleteFolderSuccess({ folderId })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(foldersActions.deleteFolderFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
