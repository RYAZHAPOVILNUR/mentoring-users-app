import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as MaterialActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { AddMaterialsType, MaterialsType } from '../models/material.type';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const MaterialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialsType[]>('/material').pipe(
          map((materials) => {
            return MaterialActions.loadMaterialsSuccess({ materials });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialActions.loadMaterialsFailure({ error }));
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
      ofType(MaterialActions.deleteMaterials),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialActions.deleteMaterialsSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialActions.deleteMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialActions.addMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      map(([{ materialData }, params]) => ({
        ...materialData,
        folder_id: Number(params['id']),
      })),
      switchMap((materialData) =>
        apiService.post<MaterialsType, AddMaterialsType>(`/material`, materialData).pipe(
          map((material) => MaterialActions.addMaterialsSuccess({ material })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialActions.addMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
