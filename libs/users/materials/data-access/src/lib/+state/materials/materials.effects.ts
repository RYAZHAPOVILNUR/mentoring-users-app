import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { switchMap, catchError, of, map } from 'rxjs';
import { materialsDTOAdapter } from '../../models/materials-dto.adapter';
import { MaterialsDTO } from '../../models/materials-dto.model';
import * as MaterialsActions from './materials.actions';


export const materialsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
         apiService.get<MaterialsDTO[]>('/material').pipe(
           map((materials) =>
             MaterialsActions.loadMaterialsSuccess({
               materials: materials
                 .map((material) =>
                 materialsDTOAdapter.DTOtoEntity(material))
             })
           ),
           catchError((error) => {
             console.error('Error', error);
             return of(MaterialsActions.loadMaterialsFailure({
               error: { status: error.status, message: error.message || 'Unknown error' },
             }));
           })
         )
      ),
    );
  },
  { functional: true }
)
