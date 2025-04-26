import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom } from 'rxjs';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { materialActions } from './materials.actions';
import { createMaterial } from '../../models/create-material.model';
import { MaterialsEntity } from '../../models/materials.models';

export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialsEntity[]>('/material').pipe(
          map((materials) => materialActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialActions.addMaterial),
      switchMap(({ materialData }) =>
        apiService.post<MaterialsEntity, createMaterial>('/material', materialData).pipe(
          map((materialEntity) => materialActions.addMaterialSuccess({ materialData: materialEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialActions.addMaterialFailed({ error }));
          })
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
      ofType(materialActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => materialActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialActions.deleteMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(materialActions.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<MaterialsEntity>(`/material/${params['id']}`).pipe(
          map((materialEntity) => materialActions.loadMaterialSuccess({ material: materialEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialActions.loadMaterialFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
