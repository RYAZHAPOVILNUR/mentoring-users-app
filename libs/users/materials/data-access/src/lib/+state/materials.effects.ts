import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap } from 'rxjs';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { MaterialStatus } from '../enums/materials-status.enum';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) =>
            MaterialsActions.loadFoldersSuccess({
              folders,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(
              MaterialsActions.loadFoldersFailure({
                status: MaterialStatus.Error,
                error,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);
