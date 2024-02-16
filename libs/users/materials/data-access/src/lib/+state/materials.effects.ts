import { inject } from '@angular/core';
import { createEffect, Actions, ofType, FunctionalEffect } from '@ngrx/effects';
import { switchMap, catchError, of, exhaustMap, map } from 'rxjs';
import { foldersActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';

export const loadFolders$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(foldersActions.loadFolders),
      exhaustMap(() => {
        return apiService.get<Folder[]>('/folder')
          .pipe(
            map((folders: Folder[]) => {
              return foldersActions.loadFoldersSuccess({ folders });
            }),
            catchError((error) => {
              return of(foldersActions.loadFoldersFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
)
