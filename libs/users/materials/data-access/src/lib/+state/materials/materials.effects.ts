import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';

@Injectable()
export class MaterialsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() => of(MaterialsActions.loadMaterialsSuccess({ materials: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(MaterialsActions.loadMaterialsFailure({ error }));
      })
    )
  );
}
