import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';

import { MaterialInterface } from '../../interfaces/material.interface';

export const loadMaterials$ = createEffect(
  (actions$ = inject(Actions),
   apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialInterface[]>('/material').pipe(
          map((materials) => {
            return MaterialsActions.loadMaterialsSuccess({ materials })
          })
        )
      )
    )
  },
  { functional: true }
);
