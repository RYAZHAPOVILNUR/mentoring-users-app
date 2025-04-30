import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { MaterialsEntity } from '../../models-material/materials.entity';
import { CreateMaterialDTO, MaterialsDTO } from '../../models-material/material-dto.model';

@Injectable()
export class MaterialsEffects {
    loadMaterials = createEffect(
      () => {
        const action$ = inject(Actions);
        const apiService = inject(ApiService);
        const store = inject(Store);
        action$.subscribe(console.log)
    
        return action$.pipe(
          ofType(MaterialsActions.initMaterials),
          withLatestFrom(store.select(selectRouteParams)),
          switchMap(([, params]) =>
            apiService.get<MaterialsEntity[]>('/material').pipe(
              map((materials) =>
                MaterialsActions.loadMaterialsSuccess({
                  materials: materials.filter((material) => material.folder_id === +params['id']),
                })
              ),
              catchError((error) => {
                console.error('Error', error);
                return of(MaterialsActions.loadMaterialsFailure({ error }));
              })
            )
          )
        );
      }, {functional: true}
    )
  
    deleteMaterial = createEffect(
      () => {
        const action$ = inject(Actions);
        const apiService = inject(ApiService);
  
        return action$.pipe(
          ofType(MaterialsActions.deleteMaterial),
          switchMap(({ id }) =>
            apiService.delete<void>(`/material/${id}`).pipe(
              switchMap(() => [
                MaterialsActions.deleteMaterialSuccess({ id }),
                MaterialsActions.initMaterials()
              ]),
              catchError((error) => {
                console.error('Error', error);
                return of(MaterialsActions.deleteMaterialFailure({ error }))
              })
            )
          )
        )
      }, {functional: true}
    )
  
    addMaterial = createEffect(
      () => {
        const actions$ = inject(Actions);
        const apiService = inject(ApiService);
  
        return actions$.pipe(
          ofType(MaterialsActions.addMaterial),
          switchMap(({ materialData }) => {
            return apiService.post<MaterialsDTO, CreateMaterialDTO>('/material', materialData).pipe(
              map((materialEntity) => MaterialsActions.addMaterialSuccess({ materialData: materialEntity })),
              catchError((error) => {
                console.log('Error', error);
                return of(MaterialsActions.addMaterialFailure({ error }));
              })
            );
          })
        );
      },
      { functional: true }
    );
  }
  