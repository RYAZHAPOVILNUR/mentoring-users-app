import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoldersActions } from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Folder } from './folders.reducer';
export const FoldersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$
      .pipe(
        ofType(FoldersActions.loadFolders),
        switchMap(() => apiService.get<Folder[]>('/folder'))
      )
      .pipe(
        map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
        catchError((error) => {
          return of(FoldersActions.loadFoldersFailed(error));
        })
      );
  },
  { functional: true }
);
