import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap } from 'rxjs';
import * as FoldersActions from './folders.actions';
import { ApiService } from '@users/core/http';
import { CreateFolderDTO, FolderDTO } from '../../models/folders.models';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);  

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
            map((folders) =>
            FoldersActions.loadFoldersSuccess({folders})
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
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
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
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
      switchMap(({ folderData }) =>
        apiService.post<FolderDTO, CreateFolderDTO>('/folder', folderData).pipe(
          map((FolderDTO) => FoldersActions.addFolderSuccess({ folderData: FolderDTO })),
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



export const openFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(FoldersActions.openFolder),
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, params]) => !!Number(params['id'])),
      switchMap(([, params]) => {
        const folderId = params['id'];

        return apiService.get<FolderDTO>(`/folder/${folderId}`).pipe(
          map((folder) => FoldersActions.openFolderSuccess({ folder })),
          catchError((error) => of(FoldersActions.openFolderFailed({ error })))
        )
      })
      
    )
  }, 
  { functional: true }
);