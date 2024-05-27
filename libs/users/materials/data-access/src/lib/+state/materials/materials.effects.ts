import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import {
  CreateMaterialsDTO,
  MaterialsDTO,
  selectRouteParams,
} from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const MaterialsInitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, { id }]) => {
        return apiService.get<MaterialsDTO[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter(
                (material) => material.folder_id === +id
              ),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const CreateMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const router = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(router.select(selectRouteParams)),
      switchMap(([{ material }, { id }]) =>
        apiService
          .post<MaterialsDTO, CreateMaterialsDTO>('/material', {
            ...material,
            folder_id: +id,
          })
          .pipe(
            map((material) =>
              MaterialsActions.addMaterialSuccess({ material })
            ),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.addMaterialFailure({ error }));
            })
          )
      )
    );
  },
  { functional: true }
);

export const RemoveMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.removeMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.removeMaterialSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.removeMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
