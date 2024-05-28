import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom } from 'rxjs';
import { FoldersActions } from './folders.actions';
import { CreateFolderDTO, FolderDTO, selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const FoldersInitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.log('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const CreateFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<FolderDTO, CreateFolderDTO>('/folder', folder).pipe(
          map((folder) => FoldersActions.addFolderSuccess({ folder })),
          catchError((error) => {
            console.log('Error', error);
            return of(FoldersActions.addFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const RemoveFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.removeFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.removeFolderSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(FoldersActions.removeFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const getFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(FoldersActions.getFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([,{ id }]) =>
        apiService.get<FolderDTO>(`/folder/${id}`).pipe(
          map((folder) => FoldersActions.getFolderSuccess({ folder })),
          catchError((error) => {
            console.log('Error', error);
            return of(FoldersActions.getFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
