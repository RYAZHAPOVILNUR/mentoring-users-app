import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import * as FolderActions from './folders.actions';
import { initFolders } from './folders.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CreateFolderDTO, FoldersDTO, selectRouteParams } from '@users/core/data-access';

export const folderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(initFolders),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folders) => FolderActions.loadFoldersSuccess({ folders })),
          catchError((err) => {
            return of(FolderActions.loadFoldersFailure({error: err}));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FolderActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<FoldersDTO,CreateFolderDTO>('/folder', folder).pipe(
          map((folder) => FolderActions.addFolderSuccess({ folder })),
          catchError((err) => {
            console.log(err)
            return of(FolderActions.loadFoldersFailure({error: err}))
          })
        )
      )
    )
  }, {functional: true}
);


export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);


    return action$.pipe(
      ofType(FolderActions.deleteFolder),
      switchMap(({ folderId }) =>
        apiService.delete<FoldersDTO>(`/folder/${folderId}`).pipe(
          map(( folder) => FolderActions.deleteFolderSuccess({ folderId })),
          catchError((err) => of(FolderActions.deleteFolderFailure( err )))
        )
      )
    )
  }, { functional: true }
)
export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(FolderActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          console.log(params['id'])
          return apiService.get<FoldersDTO>(`/material/1}`).pipe(
            map((folder) => FolderActions.loadFolderSuccess({ folder: folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(FolderActions.loadFolderFailed({ error }));
            })
          );
        }
        return of(FolderActions.updateFolderStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
