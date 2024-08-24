import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { FolderType } from './folder.materials.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<FolderType[]>('/folder').pipe(
          map((folders) =>  {
            return MaterialsActions.loadFoldersSuccess({ folders })
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailed({ error }));
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
      ofType(MaterialsActions.deleteFolder),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteFolderFailed({ error }));
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
      ofType(MaterialsActions.addFolder),
      // delay(1500),
      switchMap(({ folder }) =>
        apiService.post<FolderType, FolderType>('/folder', folder).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ folder: folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addFolderFailed({ error }));
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
      ofType(MaterialsActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<FolderType>(`/folder/${params['id']}`).pipe(
            map((folder) => MaterialsActions.loadFolderSuccess({ folder: folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadFolderFailed({ error }));
            })
          );
        }
        return of(MaterialsActions.updateFolderStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
