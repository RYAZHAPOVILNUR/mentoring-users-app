import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, concatMap, map, of } from 'rxjs';
import { AddMaterialsDTO, MaterialsDTO } from '../../materials-dto/materials-dto.models';
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
      concatMap(() =>
        apiService.get<MaterialsDTO[]>(`/material`).pipe(
          map((materials) => {
            return MaterialsActions.loadMaterialsSuccess({
              materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            });
          }),
          catchError((error) => {
            console.error('[loadFolders effect] Failed to load folders:', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
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
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      concatMap(({ materialData }) =>
        apiService.post<MaterialsDTO, AddMaterialsDTO>(`/material`, materialsDTOAdapter.EntitytoDTO(materialData)).pipe(
          map((material) => materialsDTOAdapter.DTOtoEntity(material)),
          map((materialEntity) => MaterialsActions.addMaterialSuccess({ materialData: materialEntity })),
          catchError((error) => {
            console.error('[loadFolders effect] Failed to load folders:', error);
            return of(MaterialsActions.addMaterialFailed({ error }));
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
      concatMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('[loadFolders effect] Failed to load folders:', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
