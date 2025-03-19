import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import * as MatererialsActions from './materials.actions';
import { TCreateMaterialDTO, TMaterialDTO } from '../../models/materials/material-dto.model';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFoldersEnteties } from '../folders/folders.selectors';
import * as MaterialsFoldersActions from '../../+state/folders/folders.actions';
import { selectRouteParams } from '@users/core/data-access';

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MatererialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<TMaterialDTO[]>('/material').pipe(
          map((materials) =>
            MatererialsActions.loadMaterialsSuccess({
              materials: materials.filter((material) => Number(params['id']) === material.folder_id), // отфильтрованные по id
              // materials,
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MatererialsActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadFoldersFromMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MatererialsActions.loadMaterials),
      withLatestFrom(store.select(selectFoldersEnteties)),
      filter(([, foldersEntities]) => !Object.keys(foldersEntities).length),
      map(() => MaterialsFoldersActions.loadFolder())
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MatererialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MatererialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MatererialsActions.deleteMaterialFailed({ error }));
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

    return actions$.pipe(
      ofType(MatererialsActions.addMaterial),
      switchMap(({ material }) =>
        apiService.post<TMaterialDTO, TCreateMaterialDTO>('/material', material).pipe(
          map((material) => {
            return MatererialsActions.addMaterialSuccess({
              material,
            });
          }),
          catchError((error) => {
            console.log('Error', error);
            return of(MatererialsActions.addMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
