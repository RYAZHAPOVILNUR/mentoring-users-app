import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';

@Injectable()
export class MaterialsEffects {
  loadMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => MaterialsActions.loadMaterialssSuccess({ data })),
          catchError((error) =>
            of(MaterialsActions.loadMaterialssFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
