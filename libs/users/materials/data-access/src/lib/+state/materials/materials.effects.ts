import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from '../materials/materials.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { IMaterial } from '../models/material.model';

export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      // delay(1500),
      switchMap(() =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({ materials })),

          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
