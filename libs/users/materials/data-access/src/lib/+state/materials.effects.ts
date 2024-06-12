import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() =>
          apiService.get<Folder[]>('/folder').pipe(
            map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
            catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  );

  loadMaterials$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => MaterialsActions.loadMaterialsSuccess({ data })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
