import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { switchMap, catchError, of, map } from 'rxjs';
import { foldersDTOAdapter } from '../../models/folders-dto.adapter';
import { CreateFolderDTO, FoldersDTO } from '../../models/folders-dto.model';
import * as FoldersActions from './folders.actions';


export const foldersEffect = createEffect(
	() => {
		const actions$ = inject(Actions);
		const apiService = inject(ApiService);

		return actions$.pipe(
			ofType(FoldersActions.initFolders),
			switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
					map((folders) =>
						 FoldersActions.loadFoldersSuccess({
							 folders: folders.map((folder) =>
                 foldersDTOAdapter.DTOtoEntity(folder)),
						})
					),
					catchError((error) => {
						console.error('Error', error);
						return of(FoldersActions.loadFoldersFailure({ error }))
					})
				)
			)
		)
	},
	{ functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<number>(`/folder/${id}`).pipe(
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

export const createFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.createFolder),
      switchMap(({ folderData }) =>
        apiService.post<FoldersDTO, CreateFolderDTO>('/folder', folderData ).pipe(
          map((folder) => FoldersActions.createFolderSuccess({
            folder: foldersDTOAdapter.DTOtoEntity(folder) })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.createFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
)
