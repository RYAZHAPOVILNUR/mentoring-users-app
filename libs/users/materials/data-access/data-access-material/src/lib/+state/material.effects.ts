import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { materialActions } from './material.actions';
import { CreateMaterialDTO } from '../types/create-material-dto.type';
import { MaterialDTO } from '../types/material-dto.type';
import { materialAdapter } from '../utils/material.adapter';

export const addMaterial = createEffect(
  (store = inject(Store), actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),
      switchMap(([{ material }, { id: folder_id }]) => {
        const data = materialAdapter.entityToDTO({ ...material, folderId: folder_id });
        return apiService.post<MaterialDTO, CreateMaterialDTO>('/material', data).pipe(
          map((material) => {
            const entity = materialAdapter.DTOtoEntity(material);
            return materialActions.addMaterialSuccess({ material: entity });
          }),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(materialActions.adddMaterialFailed({ error }));
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
      ofType(materialActions.loadMaterials),
      switchMap(() => {
        return apiService.get<MaterialDTO[]>('/material').pipe(
          map((materials) => {
            const entity = materials.map(materialAdapter.DTOtoEntity);
            return materialActions.loadMaterialsSuccess({ materials: entity });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(materialActions.loadMaterialsFailed({ error }));
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
      ofType(materialActions.deleteMaterial),
      switchMap(({ materialId }) =>
        apiService.delete(`/material/${materialId}`).pipe(
          map(() => materialActions.deleteMaterialSuccess({ materialId })),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(materialActions.deleteMaterialFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
