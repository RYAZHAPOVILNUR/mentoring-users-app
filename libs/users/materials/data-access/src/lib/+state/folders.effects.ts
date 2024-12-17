import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '@users/core/http';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { FoldersActions } from './folders.actions';

export const loadFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    return action$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
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

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          map((newFolder) => FoldersActions.addFolderSuccess({ folder: newFolder })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
