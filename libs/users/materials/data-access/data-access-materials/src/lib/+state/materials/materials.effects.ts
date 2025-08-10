import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';

import { materialsActions } from './materials.actions';
import { CreateMaterial, Material } from '../../interfaces/create-material.interface';

export const publishMaterial = createEffect(
  (store = inject(Store), actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.publishMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([actionPayload, routeParams]) => {
        const { material } = actionPayload;
        const folder_id = parseInt(routeParams['id']);
        const data = { ...material, folder_id };
        return apiService.post<Material, CreateMaterial>('/material', data).pipe(
          map((material) => materialsActions.publishMaterialSuccess({ material })),
          catchError((error) => {
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
  (store = inject(Store), actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials, materialsActions.publishMaterialSuccess),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, routeParams]) => {
        const folder_id = parseInt(routeParams['id']);
        return apiService.get<Material[]>('/material').pipe(
          map((materials) =>
            materialsActions.loadMaterialsSuccess({
              materials: materials.filter((folder) => folder.folder_id === folder_id),
            }),
          ),
          catchError((error) => {
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
      switchMap(({ material_id }) =>
        apiService.delete<number>(`/material/${material_id}`).pipe(
          switchMap(() => [materialsActions.deleteMaterialSuccess({ material_id }), materialsActions.loadMaterials()]),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
