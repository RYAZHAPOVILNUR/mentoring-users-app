import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { FoldersActions } from './folders.actions';
import { CreateFolderDTO, FolderDTO } from '@users/core/data-access';

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
