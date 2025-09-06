import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';

import { materialsActions } from './materials.actions';
import { CreateMaterial } from '../../interfaces/create-material.interface';
import { Material } from '../../interfaces/material.interface';

export const publishMaterial = createEffect(
  (store = inject(Store), actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.publishMaterial),
      withLatestFrom(store.select(selectRouteParams)),

      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),

      switchMap(([{ material }, { id: folder_id }]) => {
        const data: CreateMaterial = { ...material, folder_id };

        return apiService.post<Material, CreateMaterial>('/material', data).pipe(
          map((material) => materialsActions.publishMaterialSuccess({ material })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(materialsActions.publishMaterialFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadMaterials$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() => {
        return apiService.get<Material[]>('/material').pipe(
          map((materials) => materialsActions.loadMaterialsSuccess({ materials })),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(materialsActions.publishMaterialFailed({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteMaterial = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.deleteMaterial),
      switchMap(({ materialId }) =>
        apiService.delete(`/material/${materialId}`).pipe(
          map(() => materialsActions.deleteMaterialSuccess({ materialId })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
