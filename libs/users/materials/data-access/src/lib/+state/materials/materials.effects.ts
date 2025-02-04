import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import * as MatererialsActions from './materials.actions';
import { TMaterialDTO } from '../../models/materials/material-dto.model';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MatererialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<TMaterialDTO[]>('/material').pipe(
            map((materials) =>
              MatererialsActions.loadMaterialsSuccess({
                // materials: materials.filter((material) => params['id'] === material.folder_id), отфильтрованные по id
                materials,
              })
            ),
            catchError((error) => {
              console.log('Error', error);
              return of(MatererialsActions.loadMaterialsFailed({ error }));
            })
          );
        }
        return of(MatererialsActions.updateMaterialsStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MatererialsActions.deleteMaterials),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MatererialsActions.deleteMaterialsSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MatererialsActions.deleteMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
