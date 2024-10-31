import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateMaterialDTO, MaterialsDTO } from '@users/materials/data-access';
import { MaterialsEntity } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        api.get<MaterialsDTO[]>('/material').pipe(
          map((materials) => {
            const materialsEntities: MaterialsEntity[] = materials.map(material => ({
              ...material,
              preview: material.preview
            }));
            return MaterialsActions.loadMaterialsSuccess({ materials: materialsEntities });
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

export const addMaterial$ = createEffect(() => {
  const actions$ = inject(Actions);
  const api = inject(ApiService);
  const store = inject(Store);
  return actions$.pipe(
    ofType(MaterialsActions.addMaterial),
    withLatestFrom(store.select(selectRouteParams)),
    switchMap(([{ materialData }, params]) => {
      return api.post<MaterialsEntity, CreateMaterialDTO>('/material', {
        ...materialData,
        folder_id: Number(params['id'])
      }).pipe(
        map((materialEntity) => MaterialsActions.addMaterialsSuccess({ material: materialEntity })),
        catchError((error) => {
          console.error('Error from API:', error);
          return of(MaterialsActions.addMaterialsFailure({ error }));
        })
      );
    })
  );
}, { functional: true });

export const deleteMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ materialId }) =>
        api.delete(`/material/${materialId}`).pipe(
          map(() => {
            return MaterialsActions.deleteMaterialsSuccess({ materialId });
          }),
          catchError((error => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialsFailure({ error }));
          }))
        )
      )
    );
  },
  { functional: true }
);
