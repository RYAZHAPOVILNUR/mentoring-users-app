import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';

import { MaterialsActions } from './materials.actions';
import { CreateMaterial, Material } from '../interface/materials.interface';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        const folderId = Number(params['id']);
        return apiService.get<Material[]>(`/material`).pipe(
          map((material) => {
            const filteredMaterials = material.filter((material) => material.folder_id === folderId);
            return MaterialsActions.loadMaterialsSuccess({
              materials: filteredMaterials,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error: HttpErrorResponse) => {
            return of(MaterialsActions.deleteMaterialFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const addMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);
        const materialWithFolderId: CreateMaterial = {
          ...material,
          folder_id: folderId,
        };

        return apiService.post<Material, CreateMaterial>('/material', materialWithFolderId).pipe(
          map((newMaterial) => MaterialsActions.addMaterialSuccess({ material: newMaterial })),
          catchError((error: HttpErrorResponse) => {
            return of(MaterialsActions.addMaterialFailure({ error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
