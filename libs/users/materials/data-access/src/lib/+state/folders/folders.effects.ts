import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as FoldersActions from './folders.actions';
import * as FoldersFeature from './folders.reducer';
import { foldersDTOAdapter, FoldersDTO } from '@users/core/data-access';
import { ApiService } from '@users/core/http';

export const initFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folders) => {
            return FoldersActions.loadFoldersSuccess({
              folders: folders.map((folder) => foldersDTOAdapter.DTOtoEntity(folder)),
            });
          }),
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
