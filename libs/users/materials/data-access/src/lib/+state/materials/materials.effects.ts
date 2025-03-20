import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import {
  catchError,
  debounceTime,
  distinctUntilKeyChanged,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs';
import { ICreateMaterial, IMaterial } from '../../models/materials-models';
import * as MaterialsActions from './materials.actions';

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      debounceTime(500),
      distinctUntilKeyChanged('folderId'),
      switchMap(({ folderId }) => {
        return apiService.get<IMaterial[]>(`/material?folderId=${folderId}`).pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailed({ error })))
        );
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
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
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
        const folderId = Number(params['id']);
        const materialWithFolderId: ICreateMaterial = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId,
        };
        return apiService.post<IMaterial, ICreateMaterial>('/material', materialWithFolderId).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
          catchError((error) => {
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
