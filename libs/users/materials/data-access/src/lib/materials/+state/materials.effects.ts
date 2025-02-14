import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { CreateMaterialDTO, MaterialsDTO, MaterialsEntity } from '../../models/materials.interface';
import * as MaterialsActions from './materials.actions';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService
          .get<MaterialsDTO[]>('/material')
          .pipe(map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })))
      ),
      catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ materialData }) =>
        apiService.post<MaterialsEntity, CreateMaterialDTO>('/material', materialData).pipe(
          map((materialData) => MaterialsActions.addMaterialSuccess({ materialData })),
          catchError((error) => of(MaterialsActions.addMaterialFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteMaterialFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);
