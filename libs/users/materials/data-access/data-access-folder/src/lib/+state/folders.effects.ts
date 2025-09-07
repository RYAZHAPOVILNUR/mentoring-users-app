import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';

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
      concatLatestFrom(() => store.select(selectRouteParams)),
      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),
      switchMap(([, { id: folderId }]) => {
        return apiService.get<Folder>(`/folder/${folderId}`).pipe(
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
