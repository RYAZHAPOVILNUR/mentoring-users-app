import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/material-add.model';

export const loadMaterials = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return action$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter((material) => material.folder_id === Number(params['id'])),
            })
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
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    return action$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.deleteMaterialFailure({ error }));
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

        const newMaterial: IAddMaterial = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId,
        };

        return apiService.post<IMaterial, IAddMaterial>('/material', newMaterial).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material: material })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.addMaterialFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
