import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { CreateMaterialDTO, MaterialsDTO } from '@users/core/data-access';
import { ApiService } from '@users/core/http';

export const materialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ material: materials })),
          catchError((err) => of(MaterialsActions.loadMaterialsFailure(err)))
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({material}) =>
        apiService.post<MaterialsDTO, CreateMaterialDTO>('/material', material).pipe(
          map(material => MaterialsActions.addMaterialSuccess({ material: material })),
          catchError((err) => of(MaterialsActions.loadMaterialsFailure(err)))
        )
      )
    )
  }, { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({material}) =>
        apiService.delete(`/material/${material.id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({materialId: material.id})),
          catchError((err) => of(MaterialsActions.deleteMaterialFailure(err)))
        )
      )
    )
  }, { functional: true }
)
