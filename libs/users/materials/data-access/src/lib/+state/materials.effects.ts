import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { folderActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { FolderCreateInterface } from '../models/folder-create.interface';

export const loadFoldersEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(folderActions.loadFolders),
      exhaustMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => folderActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            return of(folderActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createFolderEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(folderActions.createFolder),
      exhaustMap(({ title }) =>
        apiService.post<Folder, FolderCreateInterface>('/folder', { title }).pipe(
          map((folder) => folderActions.createFolderSuccess({ folder })),
          catchError((error) => {
            return of(folderActions.createFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
