import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { catchError, switchMap, map, of, withLatestFrom } from 'rxjs';
import { MaterialsDTO } from '../../materials-dto/materials-dto.models';
import { materialsDTOAdapter } from '../../materials-dto/materials-dto.adapter';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        console.log('Effects Params', params);
        if (params['id']) {
          return apiService.get<MaterialsDTO>(`/material/${params['id']}`).pipe(
            map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            map((materialsEntity) => MaterialsActions.loadMaterialSuccess({ materialData: materialsEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadMaterialFailed({ error }));
            })
          );
        }
        return of(MaterialsActions.updateMaterialState({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
