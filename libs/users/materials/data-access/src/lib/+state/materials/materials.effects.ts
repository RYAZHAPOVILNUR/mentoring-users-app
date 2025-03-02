import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { initMaterials } from './materials.actions';
import { MaterialsDTO } from '../../../../../../../core/data-access/src/lib/materials-dto.model';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '../../../../../../../core/http/src';


export const materialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(initMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>('/material').pipe(
          map((material) => MaterialsActions.loadMaterialsSuccess({ material })),
          catchError((err) => {
            console.log(err.message)
            return of(MaterialsActions.loadMaterialsFailure(err))
          })
        )
      )
    )
  }, {functional: true})
