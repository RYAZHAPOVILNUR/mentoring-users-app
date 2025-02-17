import { createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { CreateFolderDTO, FolderDTO } from '../models/folder-models';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadFolders = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(FoldersActions.loadFolders),
    switchMap(() => {
      return apiService.get<FolderDTO[]>('/folder').pipe(
        map((folders) => {
          return FoldersActions.loadFoldersSuccess({ folders });
        }),
        catchError((error) => {
          return of(FoldersActions.loadFolderFailed({ error }));
        })
      );
    })
  );
}, { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<FolderDTO, CreateFolderDTO>('/folder', folder).pipe(
          map((folder) =>
            FoldersActions.addFolderSuccess({ folder })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailed({ error }));
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
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) => {
        return apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailed({ error }));
          })
        );
      })
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
        return apiService.get<FolderDTO>(`/folder/${params['id']}`).pipe(
          map((folder) => FoldersActions.openFolderSuccess({ folder })),
          catchError((error) => of(FoldersActions.openFolderFailed({ error })))
        )
      })
    )
  }, 
  { functional: true }
);