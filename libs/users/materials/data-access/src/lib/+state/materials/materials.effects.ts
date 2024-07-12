import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import {MaterialsActions} from './materials.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Material } from '../../models/material.model';
import { MaterialAdd } from '../../models/material-add.model';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  }, {functional: true}
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({id}) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailure({error}));
          })
        )
      )
    );
  }, {functional: true}
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      map(([{material}, params]) => ({
        ...material,
        folder_id: Number(params['id'])
      })),
      switchMap((material) =>
        apiService.post<Material, MaterialAdd>(`/material`, material).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailure({error}));
          })
        )
      )
    );
  }, {functional: true}
);
