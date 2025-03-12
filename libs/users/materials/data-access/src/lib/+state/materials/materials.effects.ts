import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateMaterialDTO, MaterialDTO } from '../../models/materials.models';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);  

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialDTO[]>('/material').pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({materials})
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
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
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
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
      switchMap(([{ material }, params]) => {
        const folderId = params['id'];
        const materialWithFolder = { ...material, folder_id: folderId };
        return apiService.post<MaterialDTO, CreateMaterialDTO>('/material', materialWithFolder).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
            catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        )
      })
    );
  },
  { functional: true }
);

