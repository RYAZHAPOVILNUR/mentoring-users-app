import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { folderActions } from './materials.actions';
import { Folder } from '../models/folder.interface';

export const loadFoldersEffect = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(folderActions.loadFolders),
      exhaustMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => folderActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(folderActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
