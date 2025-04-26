import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom } from 'rxjs';
import { ApiService } from '@users/core/http';
import { folderActions } from './folders.actions';
import { FoldersEntity } from '../../models/folders.models';
import { CreateFolder } from '../../models/create-folder.models';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(folderActions.loadFolders),
      switchMap(() =>
        apiService.get<FoldersEntity[]>('/folder').pipe(
          map((folders) => folderActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(folderActions.loadFoldersFailed({ error }));
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
      ofType(folderActions.addFolder),
      switchMap(({ folderData }) =>
        apiService.post<FoldersEntity, CreateFolder>('/folder', folderData).pipe(
          map((folderEntity) => folderActions.addFolderSuccess({ folderData: folderEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(folderActions.addFolderFailed({ error }));
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
      ofType(folderActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => folderActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(folderActions.deleteFolderFailed({ error }));
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
      ofType(folderActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<FoldersEntity>(`/folder/${params['id']}`).pipe(
          map((folderEntity) => folderActions.loadFolderSuccess({ folder: folderEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(folderActions.loadFolderFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
