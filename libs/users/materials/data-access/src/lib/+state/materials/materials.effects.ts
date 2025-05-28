import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { CreateMaterialDTO, MaterialDTO } from '../models/material-model';

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      mergeMap(([, params]) =>
        apiService.get<MaterialDTO[]>('/material').pipe(
          map(materials =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter(
                material => material.folder_id === +params['id']
              )
            })
          )
        )
      ),
      catchError(error => {
        console.error('Error', error);
        return of(MaterialsActions.loadMaterialsFailed({ error }));
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
      mergeMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError(error => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialrFailed({ error }));
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
      mergeMap(([{ material }, params]) => {
        const folder_id = Number(params['id']);

        const materialWithFolderId: CreateMaterialDTO = {
          title: material.title,
          material_link: material.material_link,
          folder_id
        };

        return apiService.post<MaterialDTO, CreateMaterialDTO>('/material', materialWithFolderId).pipe(
          map(newMaterial =>
            MaterialsActions.addMaterialSuccess({ material: newMaterial })
          ),
          catchError(error => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);