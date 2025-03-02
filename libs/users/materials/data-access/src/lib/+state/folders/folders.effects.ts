import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '@users/core/http';
import { FoldersDTO, foldersDTOAdapter, FoldersEntity } from '@users/core/data-access';
import { foldersActions } from './folders.actions';

export const loadFolders = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(foldersActions.initFolders),
    switchMap(() =>
      apiService.get<FoldersDTO[]>('/folder').pipe(
        map((folders) => foldersActions.loadFoldersSuccess({
          folders: folders.map(foldersDTOAdapter.DTOtoEntity),
        })),
        catchError((error) => {
          console.error('Load folders error:', error);
          return of(foldersActions.loadFoldersFailure({ error }));
        })
      )
    )
  );
}, { functional: true });

export const addFolder = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(foldersActions.addFolder),
    switchMap(({ folderData }) =>
      apiService.post<FoldersDTO, FoldersEntity>('/folder', folderData).pipe(
        map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
        map((folderEntity) => foldersActions.addFolderSuccess({ folderData: folderEntity })),
        catchError((error) => {
          console.error('Add folder error:', error);
          return of(foldersActions.addFolderFailure({ error }));
        })
      )
    )
  );
}, { functional: true });

export const deleteFolder = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(foldersActions.deleteFolder),
    switchMap(({ id }) =>
      apiService.delete<void>(`/folder/${id}`).pipe(
        map(() => foldersActions.deleteFolderSuccess({ id })),
        catchError((error) => {
          console.error('Delete folder error:', error);
          return of(foldersActions.deleteFolderFailure({ error }));
        })
      )
    )
  );
}, { functional: true });
