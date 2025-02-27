import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, switchMap, map, of, withLatestFrom } from 'rxjs';
import { MaterialsDTO } from '../../materials-dto/materials-dto.models';
import { materialsDTOAdapter } from '../../materials-dto/materials-dto.adapter';
import * as MaterialsActions from './materials.actions';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          console.log('Params Materials>>>', params['id']);
        }
        apiService.get<MaterialsDTO[]>(`/material/${params['id']}`).pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        );
        return of(MaterialsActions.updateMaterialState({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
