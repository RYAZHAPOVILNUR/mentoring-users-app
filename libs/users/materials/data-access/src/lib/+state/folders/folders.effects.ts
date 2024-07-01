import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { foldersActions } from './folders.actions';
import { catchError, of, switchMap } from 'rxjs';
import { Folder } from '../../interfaces/folder.interface';
import { map, withLatestFrom } from 'rxjs/operators';
import { FolderCreate } from '../../types/folder-create.type';
import { selectFoldersState } from './folders.selectors';
import { Store } from '@ngrx/store';
import { foldersSelector } from './folders.reducer';

const { selectAll } = foldersSelector.getSelectors();


export const loadFolders$ = createEffect(
  (actions$ = inject(Actions),
   store = inject(Store),
   apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(foldersActions.loadFolders),
      withLatestFrom(store.select(selectFoldersState)),
      map(([_, state]) =>
        state.status === 'init'
          ? apiService.get<Folder[]>(`/folder`)//.pipe(tap(() => console.log('дёрнули бэк')))
          : of(selectAll(state))
      ),
      switchMap((source$) =>
        source$.pipe(
          map(folders => foldersActions.loadFoldersSuccess({ folders })),
          catchError(error => {
            console.error('Error', error);
            return of(foldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const createFolder$ = createEffect((
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => actions$.pipe(
    ofType(foldersActions.createFolder),
    switchMap(({ title }) => {
      return apiService.post<Folder, FolderCreate>('/folder', { title }).pipe(
        map((folder) => foldersActions.createFolderSuccess({ folder })),
        catchError((error) => {
          console.error('Error', error);
          return of(foldersActions.createFolderFailure({ error }));
        })
      );
    })
  ),
  { functional: true }
);

export const deleteFolder$ = createEffect((
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => actions$.pipe(
    ofType(foldersActions.deleteFolder),
    switchMap(({ id }) =>
      apiService.delete<null>(`/folder/${id}`).pipe(
        map(() => foldersActions.deleteFolderSuccess({ id })),
        catchError((error) => {
          console.error('Error', error);
          return of(foldersActions.deleteFolderFailure({ error }));
        })
      )
    )
  ),
  { functional: true }
);


