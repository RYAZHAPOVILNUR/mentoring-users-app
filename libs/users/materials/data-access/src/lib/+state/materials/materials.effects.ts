import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IMaterial, IAddMaterial } from '../../models/material.model';

import { ApiService } from '@users/core/http';
import { map, switchMap, catchError, of, withLatestFrom } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
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
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteMaterialFailed({ error })))
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
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      map(([{ materialData }, params]) => ({
        ...materialData,
        folder_id: Number(params['id']),
      })),
      switchMap((materialsData) =>
        apiService.post<IMaterial, IAddMaterial>('/material', materialsData).pipe(
          map((materials) => MaterialsActions.addMaterialSuccess({ materials })),
          catchError((error) => of(MaterialsActions.addMaterialFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);
