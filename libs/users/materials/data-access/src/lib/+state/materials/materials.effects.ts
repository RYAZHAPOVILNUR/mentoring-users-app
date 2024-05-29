import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { materialsActions } from './materials.actions';
import { selectRouteParams } from '@users/core/data-access';
import { TMaterialEntity, TMaterialDTO } from '../../models/materials/material-data.models';
import { of } from 'rxjs';

// Load Materials
export const loadMaterialsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      exhaustMap(([, params]) => {
        if (params['id']) {
          return apiService.get<TMaterialDTO[]>(`/material`).pipe(
            map((materials) =>
              materialsActions.loadMaterialsSuccess({ materials })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(materialsActions.loadMaterialsFailure({ error }));
            })
          )
        }
        return of()
      })
    )
  }, { functional: true }
);

// Create Material
export const createMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(materialsActions.createMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      map(([{ material }, params]) => ({ ...material, folder_id: Number(params['id']) })),
      exhaustMap((material) =>
        apiService.post<TMaterialDTO, TMaterialEntity>('/material', material).pipe(
          map((material) => materialsActions.createMaterialSuccess({ material })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.createMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// Delete Material
export const deleteMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialsActions.deleteMaterial),
      exhaustMap(({ material }) =>
        apiService.delete<TMaterialDTO>(`/material/${material.id}`).pipe(
          map(() => materialsActions.deleteMaterialSuccess({ id: material.id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true }
);
