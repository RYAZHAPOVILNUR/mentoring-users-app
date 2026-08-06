import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParam } from '@shared/util-store';
import { CreateMaterial, Material } from '@users/ui-materials';

import { MaterialsActions } from './materials.actions';

export const loadMaterialsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() => apiService.get<Material[]>('/material')),
      map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
      catchError(() => of(MaterialsActions.loadMaterialsFailure())),
    );
  },
  { functional: true },
);

export const deleteMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      mergeMap(({ id }) =>
        apiService.delete<Material>(`/material/${id}`).pipe(
          map(() => {
            return id;
          }),
        ),
      ),
      map((deletedMaterialId) => MaterialsActions.deleteMaterialSuccess({ deletedMaterialId })),
      catchError(() => of(MaterialsActions.deleteMaterialFailure())),
    );
  },
  { functional: true },
);

export const createMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.createMaterial),
      withLatestFrom(store.select(selectRouteParam('id'))),
      filter(([, id]) => Boolean(Number(id))),
      mergeMap(([{ createMaterial }, folderId]) => {
        return apiService.post<Material, CreateMaterial & Pick<Material, 'folder_id'>>('/material', {
          ...createMaterial,
          folder_id: Number(folderId),
        });
      }),
      map((newMaterial) => MaterialsActions.createMaterialSuccess({ newMaterial })),
      catchError(() => of(MaterialsActions.createMaterialFailure())),
    );
  },
  { functional: true },
);
