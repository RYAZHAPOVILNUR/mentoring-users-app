import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { folderActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { FolderCreateInterface } from '../models/folder-create.interface';
import { NotifyService } from '@users/core/notify';

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
  (actions$ = inject(Actions), apiService = inject(ApiService), notify = inject(NotifyService)) => {
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

export const displaySuccessNotificationEffect = createEffect(
  (actions$ = inject(Actions), notify = inject(NotifyService)) => {
    return actions$.pipe(
      ofType(folderActions.createFolderSuccess),
      tap(() => {
        notify.open('Successfully created new folder!', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000,
        });
      })
    );
  },
  { functional: true, dispatch: false }
);

export const displayErrorNotificationEffect = createEffect(
  (actions$ = inject(Actions), notify = inject(NotifyService)) => {
    return actions$.pipe(
      ofType(folderActions.createFolderFailure),
      tap(() => {
        notify.open('Failed to create new folder!', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000,
        });
      })
    );
  },
  { functional: true, dispatch: false }
);
