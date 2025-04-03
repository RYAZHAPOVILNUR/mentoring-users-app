import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, switchMap, map, of } from 'rxjs';
import { MaterialsDTO } from '../../materials-dto/materials-dto.models';
import { materialsDTOAdapter } from '../../materials-dto/materials-dto.adapter';
import * as MaterialsActions from './materials.actions';
import { Store } from '@ngrx/store';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>(`/material`).pipe(
          map((materials) => {
            return MaterialsActions.loadMaterialsSuccess({
              materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            });
          }),
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
