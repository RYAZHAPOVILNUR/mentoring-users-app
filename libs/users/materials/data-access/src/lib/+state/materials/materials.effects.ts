import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import * as MaterialsActions from './materials.actions';
import { catchError, switchMap, map, of } from 'rxjs';
import { MaterialsDTO } from '../../materials-dto/materials-dto.models';
import { materialsDTOAdapter } from '../../materials-dto/materials-dto.adapter';

@Injectable()
export class MaterialsEffects {
  materialsEffects = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      return actions$.pipe(
        ofType(MaterialsActions.initMaterials),
        // delay(1500),
        switchMap(() =>
          apiService.get<MaterialsDTO[]>('/material_2092').pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({
                materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
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
}
