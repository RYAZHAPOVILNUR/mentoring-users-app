import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { switchMap, catchError, of, map } from 'rxjs';
import { materialsDTOAdapter } from '../../models/materials-dto.adapter';
import { CreateMaterialsDTO, MaterialsDTO } from '../../models/materials-dto.model';
import { materialsActions }  from './materials.actions';


export const materialsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(materialsActions.initMaterials),
      switchMap(() =>
         apiService.get<MaterialsDTO[]>('/material').pipe(
           map((materials) =>
             materialsActions.loadMaterialsSuccess({
               materials: materials
                 .map((material) =>
                 materialsDTOAdapter.DTOtoEntity(material))
             })
           ),
           catchError((error) => {
             console.error('Error', error);
             return of(materialsActions.loadMaterialsFailure({
               error: { status: error.status, message: error.message || 'Unknown error' },
             }));
           })
         )
      ),
    );
  },
  { functional: true }
);

export const addMaterialsEffect = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(materialsActions.addMaterials),
      switchMap(({ materialData }) =>
        apiService.post<MaterialsDTO, CreateMaterialsDTO>('/material', materialData).pipe(
          map((material) => materialsActions.addMaterialsSuccess({
            material: materialsDTOAdapter.DTOtoEntity(material)
          })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.addMaterialsFailure({ error }));
          })
        ))
    );
  },
  { functional: true }
);

export const deleteMaterialsEffect = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(materialsActions.deleteMaterials),
      switchMap(({ id }) =>
        apiService.delete<MaterialsDTO>(`/material/${id}`).pipe(
          map(() => materialsActions.deleteMaterialsSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
