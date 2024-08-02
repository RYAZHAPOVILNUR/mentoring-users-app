import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { materialsActions } from './materials.actions';
import { catchError, switchMap, withLatestFrom, map, of } from 'rxjs';
import { AddMaterialType, MaterialType } from '../models/material.type';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const addMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(materialsActions.addMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      map(([{ material }, params]) => ({
        ...material,
        folder_id: Number(params['id']),
      })),
      switchMap((material) =>
        apiService.post<MaterialType, AddMaterialType>(`/material`, material).pipe(
          map((material) => materialsActions.addMaterialsSuccess({ material })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.addMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialType[]>('/material').pipe(
          map((materials) => {
            return materialsActions.loadMaterialsSuccess({ materials });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialsActions.deleteMaterials),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => {
            return materialsActions.deleteMaterialsSuccess({ id });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
