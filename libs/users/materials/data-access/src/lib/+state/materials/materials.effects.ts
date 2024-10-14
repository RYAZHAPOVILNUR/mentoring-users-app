import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delayWhen, filter, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialType, CreateMaterialDTO, selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { MaterialsEntity } from './materials.types';
import * as FoldersSelectors from '../folders/folders.selectors';
import { foldersActions } from '../folders/folders.actions';

export const materialsInit = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      map(() => foldersActions.initFolders()),
      takeUntil(store.select(FoldersSelectors.selectIsFoldersLoaded).pipe(filter(Boolean)))
    );
  },
  { functional: true }
);

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      delayWhen(() => store.select(FoldersSelectors.selectIsFoldersLoaded)),
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