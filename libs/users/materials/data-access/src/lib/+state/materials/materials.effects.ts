import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateMaterialDTO, MaterialsDTO } from '../../models/materials-dto.model';
import { MaterialsEntity } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      tap(() => console.log('Effect triggered')),
      switchMap(() =>
        api.get<MaterialsDTO[]>('/material').pipe(
          tap(() => console.log('API request sent')),
          tap((materials) => console.log('effect, materials', materials)),
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error })
            );
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
  const store = inject(Store)
  return actions$.pipe(
    ofType(MaterialsActions.addMaterial),
    withLatestFrom(store.select(selectRouteParams)),
    switchMap(([{ materialData }, params]) => {
      console.log('Sending data to API:', materialData);
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
