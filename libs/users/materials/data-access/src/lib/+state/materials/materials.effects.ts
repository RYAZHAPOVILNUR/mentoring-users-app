import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { materialsActions } from './materials.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddMaterialsEntity, MaterialsDTO, materialsDTOAdapter } from '@users/core/data-access';

export const loadMaterials = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(materialsActions.loadMaterials),
    switchMap(() =>
      apiService.get<MaterialsDTO[]>('/material').pipe(
        map((materials) => materialsActions.loadMaterialsSuccess({
          materials: materials.map(materialsDTOAdapter.DTOtoEntity)
        })),
        catchError((error) => {
          return of(materialsActions.loadMaterialsFailure({ error }));
        })
      )
    )
  );
}, { functional: true });

export const addMaterial = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(materialsActions.addMaterial),
    switchMap(({ materialData }) =>
      apiService.post<MaterialsDTO, AddMaterialsEntity>('/material', materialData).pipe(
        map((material) => materialsDTOAdapter.DTOtoEntity(material)
        ),
        map((materialEntity) =>
          materialsActions.addMaterialSuccess({ materialData: materialEntity })
        ),
        catchError((error) => {
          return of(materialsActions.addMaterialFailure({ error }));
        })
      )
    )
  );
}, { functional: true });

export const deleteMaterial = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(materialsActions.deleteMaterial),
    switchMap(({ materialId }) =>
      apiService.delete<MaterialsDTO>(`/material/${materialId}`).pipe(
        map(() => materialsActions.deleteMaterialSuccess({ materialId })),
        catchError((error) => {
          return of(materialsActions.deleteMaterialFailure({ error }));
        })
      )
    )
  );
}, { functional: true });


