import { ApiService } from '@users/core/http';
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { foldersActions } from "./folders.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { TFolderDTO, TFolderCreate } from '../../models/folders/folder-data.models';

// Load Folders
export const loadFoldersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.loadFolders),
      exhaustMap(() =>
        apiService.get<TFolderDTO[]>('/folder').pipe(
          map((folders) => foldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            return of(foldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// Create Folder
export const createFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.createFolder),
      exhaustMap(({ folderTitle }) =>
        apiService.post<TFolderDTO, TFolderCreate>('/folder', folderTitle).pipe(
          map((folder) => foldersActions.createFolderSuccess({ folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.createFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// Delete Folder
export const deleteFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(foldersActions.deleteFolder),
      exhaustMap(({ folder }) =>
        apiService.delete<TFolderDTO>(`/folder/${folder.id}`).pipe(
          map(() => foldersActions.deleteFolderSuccess({ id: folder.id })),
          catchError((error) => {
            console.error('Error', error);
            return of(foldersActions.deleteFolderFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true }
);
