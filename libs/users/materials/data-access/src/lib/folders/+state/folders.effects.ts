import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CreateFolderDTO, FoldersDTO } from '../../models/folders.interface';
import * as FoldersActions from './folders.actions';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(map((folders) => FoldersActions.loadFoldersSuccess({ folders })))
      ),
      catchError((error) => of(FoldersActions.loadFoldersFailure({ error })))
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
      switchMap(({ folderData }) =>
        apiService.post<FoldersDTO, CreateFolderDTO>('/folder', folderData).pipe(
          map((folderData) => FoldersActions.addFolderSuccess({ folderData })),
          catchError((error) => of(FoldersActions.addFolderFailed({ error })))
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
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => of(FoldersActions.deleteFolderFailed({ error })))
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
      ofType(FoldersActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<FoldersDTO>(`/folder/${params['id']}`).pipe(
            map((folderEntity) => FoldersActions.loadFolderSuccess({ folderData: folderEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.loadFolderFailed({ error }));
            })
          );
        }
        return of(FoldersActions.updateFolderStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
