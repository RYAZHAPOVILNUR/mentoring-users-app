import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { catchError, of, switchMap } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Material } from '../../interfaces/material.interface';

export const loadMaterials$ = createEffect(
  (actions$ = inject(Actions),
   apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(({ id }) =>
        apiService.get<Material[]>(`/material`).pipe(
          map(materials => materials.filter(
            material => material.folder_id === Number(id) // todo ЗАГРУЖАТЬ ВСЕ МАТЕРИАЛЫ 1 РАЗ
          )),
          map(materials => materialsActions.loadMaterialsSuccess({ materials })),
          catchError(error => {
            console.error('Error', error);
            return of(materialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    ),
  { functional: true }
);