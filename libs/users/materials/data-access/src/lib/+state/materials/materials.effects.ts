import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialsEntity } from './materials.reducer';
import { MaterialType, CreateMaterialDTO, selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      // delay(1500),
      switchMap(() =>
        apiService.get<MaterialsEntity[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({ materials }),
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

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ materialData }, params]) =>
        apiService.post<MaterialType, CreateMaterialDTO>('/material', {
          ...materialData,
          folder_id: Number(params['id']),
        }).pipe(
          map((materialEntity) => MaterialsActions.addMaterialSuccess({ material: materialEntity })),
          catchError((error) => {
            console.error('Error', error);
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
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ materialId }) =>
        apiService.delete<void>(`/material/${materialId}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ materialId })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);