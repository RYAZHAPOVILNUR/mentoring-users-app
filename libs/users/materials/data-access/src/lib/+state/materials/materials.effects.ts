import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { materialsActions } from './materialsActions';
import { ApiService } from '@users/core/http';
import { Material } from '../../interfaces/material.interface';

export const loadMaterials$ = createEffect(
  (actions$ = inject(Actions),
   apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => {
            return materialsActions.loadMaterialsSuccess({ materials })
          })
        )
      )
    )
  },
  { functional: true }
);
