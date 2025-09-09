import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@shared/util-store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { mapMaterialFromApi, mapMaterialsFromApi } from './material.adapter';
import { materialsActions } from './materials.actions';
import { CreateMaterialDTO } from '../interfaces/create-material.dto';
import { MaterialDTO } from '../interfaces/material-dto';

export const publishMaterial = createEffect(
  (store = inject(Store), actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.publishMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      filter(([, routeParams]) => Boolean(Number(routeParams['id']))),
      switchMap(([{ material }, { id: folder_id }]) => {
        const data: CreateMaterialDTO = {
          title: material.title,
          material_link: material.materialLink,
          folder_id,
        };
        return apiService.post<MaterialDTO, CreateMaterialDTO>('/material', data).pipe(
          map((dto) => mapMaterialFromApi(dto)),
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
        return apiService.get<MaterialDTO[]>('/material').pipe(
          map((dto) => mapMaterialsFromApi(dto)),
          map((materials) => materialsActions.loadMaterialsSuccess({ materials })),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(materialsActions.loadMaterialsFailed({ error }));
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
