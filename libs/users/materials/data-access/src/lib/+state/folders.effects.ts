import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as FoldersActions from './folders.actions';

import { ApiService } from '@users/core/http';

import { FoldersEntity } from './folders.reducer';

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FoldersEntity[]>('/folder').pipe(
          map((folders) =>
            FoldersActions.loadFoldersSuccess({ folders }),
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