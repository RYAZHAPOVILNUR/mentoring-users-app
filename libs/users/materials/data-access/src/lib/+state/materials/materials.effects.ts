import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { initMaterials } from './materials.actions';
import { CreateMaterialDTO, MaterialsDTO } from '../../../../../../../core/data-access/src/lib/materials-dto.model';
import * as MaterialsActions from './materials.actions';
import * as FoldersActions from '../folders/folders.actions';
import { ApiService } from '../../../../../../../core/http/src';
import { selectRouteParams } from '../../../../../../../core/data-access/src';



export const materialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>('/material').pipe(
          map(materials => MaterialsActions.loadMaterialsSuccess({material: materials})),
          catchError((err) => of(MaterialsActions.loadMaterialsFailure(err)))
        )
      )
    )
  }, {functional: true});

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({material}) =>
        apiService.post<MaterialsDTO, CreateMaterialDTO>('/material', material).pipe(
          map(material => MaterialsActions.addMaterialSuccess({ material: material })),
          catchError((err) => of(MaterialsActions.loadMaterialsFailure(err)))
        )
      )
    )
  }, { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({material}) =>
        apiService.delete(`/material/${material.id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({materialId: material.id})),
          catchError((err) => of(MaterialsActions.deleteMaterialFailure(err)))
        )
      )
    )
  }, { functional: true }
)
