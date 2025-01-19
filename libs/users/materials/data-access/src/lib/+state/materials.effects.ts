import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { Store, select } from '@ngrx/store';
// import { selectMaterialsEntities } from './materials.selectors';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          map((response) => MaterialsActions.addFolderSuccess({ folder: response })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
