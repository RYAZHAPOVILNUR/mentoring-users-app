import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ICreateFolder, IFolder } from '../../models/folders-model';
import * as FoldersActions from './folders.actions';

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() => {
        return apiService.get<IFolder[]>('/folder').pipe(
          map((folders) => {
            return FoldersActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            return of(FoldersActions.loadFoldersFailed({ error }));
          })
        );
      })
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
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
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
      switchMap(({ folder }) =>
        apiService.post<IFolder, ICreateFolder>('/folder', folder).pipe(
          map((folder) => FoldersActions.addFolderSuccess({ folder })),
          catchError((error) => {
            return of(FoldersActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const openFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(FoldersActions.openFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
          map((folder) => FoldersActions.openFolderSuccess({ folder })),
          catchError((error) => {
            return of(FoldersActions.openFolderFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
