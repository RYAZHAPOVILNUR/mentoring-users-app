import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { FoldersActions } from './folders.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddFolderDTO, FolderDTO } from '../../models/folder.model';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.loadFoldersSuccess({ folders })
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
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(FoldersActions.deleteFolder),
      tap(({ id }) => console.log('Delete folder started with ID:', id)), // Отладочный лог
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => {
            console.log('Delete folder succeeded for ID:', id); // Успешный лог
            return FoldersActions.deleteFolderSuccess({ id });
          }),
          catchError((error) => {
            console.error('Error during delete folder:', error);
            return of(FoldersActions.deleteFolderFailure({ error }));
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
        apiService.post<FolderDTO, AddFolderDTO>('/folder', folder).pipe(
          map((newFolder) =>
            FoldersActions.addFolderSuccess({ folder: newFolder })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(FoldersActions.addFolderFailure({ error }))
          })
        )
      ))
  }, {functional: true}
)
