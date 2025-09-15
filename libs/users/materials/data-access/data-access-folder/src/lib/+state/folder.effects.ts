import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { folderActions } from './folder.actions';
import { CreateFolderDTO } from '../types/create-folder-dto.type';
import { FolderDTO } from '../types/folder-dto.type';

export const addFolder$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(folderActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<FolderDTO, CreateFolderDTO>('/folder', folder).pipe(
          map((folder) => folderActions.addFolderSuccess({ folder })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(folderActions.addFolderFailed({ error }));
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
      ofType(folderActions.loadFolders),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders) => folderActions.loadFoldersSuccess({ folders })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(folderActions.loadFoldersFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadFolderById$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(folderActions.loadFolderById),
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),
      switchMap(([, { id: folder_id }]) => {
        return apiService.get<FolderDTO>(`/folder/${folder_id}`).pipe(
          map((folder) => folderActions.loadFolderByIdSuccess({ folder })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(folderActions.loadFolderByIdFailed({ error }));
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
      ofType(folderActions.deleteFolder),
      switchMap(({ folderId }) =>
        apiService.delete(`/folder/${folderId}`).pipe(
          map(() => folderActions.deleteFolderSuccess({ folderId })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(folderActions.deleteFolderFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
