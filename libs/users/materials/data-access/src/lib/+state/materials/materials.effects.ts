import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialsDTO } from '../../models/materials-dto.model';
import { CreateFolderDTO } from '../../models/folders-dto.model';
import { MaterialsEntity } from './materials.reducer';

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

export const addMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ materialData }) =>
        api.post<MaterialsEntity, CreateFolderDTO>('/material', materialData).pipe(
          map((materialEntity) =>
            MaterialsActions.addMaterialsSuccess({ material: materialEntity })
          ),
          catchError((error => {
              console.error('Error', error);
              return of(MaterialsActions.addMaterialsFailure({ error }));
            })
          )
        )));
  }, { functional: true }
);

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
