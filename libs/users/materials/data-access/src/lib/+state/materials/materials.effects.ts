import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { catchError, of, switchMap } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialDTO } from '../../interfaces/material-dto.interface';
import { MaterialCreate } from '../../types/material-create.type';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { selectMaterialsState } from './materials.selectors';
import { materialsAdapter } from './materials.reducer';
import { MaterialEntity } from '../../interfaces/material-entity.interface';

const { selectAll } = materialsAdapter.getSelectors();

export const loadMaterialsApi$ = createEffect(
  (actions$ = inject(Actions),
   store = inject(Store),
   apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(materialsActions.loadMaterials),
      withLatestFrom(store.select(selectMaterialsState)),
      map(([_, state]) =>
        state.status === 'init'
          ? apiService.get<MaterialDTO[]>(`/material`) // === Observable<Material[]>
          : of(selectAll(state))),
      switchMap((source$) =>
        source$.pipe(
          map(materials => materialsActions.loadMaterialsSuccess({ materials })),
          catchError(error => {
            console.error('Error', error);
            return of(materialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    ),
  { functional: true }
);

// export const loadMaterialsApi$ = createEffect(
//   (actions$ = inject(Actions),
//    apiService = inject(ApiService)) =>
//     actions$.pipe(
//       ofType(materialsActions.loadMaterialsApi),
//       switchMap(() =>
//         apiService.get<Material[]>(`/material`).pipe(
//           map(materials => materialsActions.loadMaterialsSuccess({ materials })),
//           catchError(error => {
//             console.error('Error', error);
//             return of(materialsActions.loadMaterialsFailure({ error }));
//           })
//         )
//       )
//     ),
//   { functional: true }
// );

// export const loadMaterials$ = createEffect(
//   (actions$ = inject(Actions),
//    store = inject(Store)) =>
//     actions$.pipe(
//       ofType(materialsActions.loadMaterials),
//       withLatestFrom(store.select(selectMaterialsStatus)),
//       filter(([_, status]) => status === 'init'),
//       map(() => materialsActions.loadMaterialsApi())
//     ),
//   { functional: true }
// );

export const createMaterial$ = createEffect((
  actions$ = inject(Actions),
  apiService = inject(ApiService),
  store = inject(Store)
) => {
  return actions$.pipe(
    ofType(materialsActions.createMaterial),
    withLatestFrom(store.select(selectRouteParams)),
    map(([{ material }, params]): MaterialCreate => ({
      ...material,
      folderId: Number(params['id'])
    })),
    switchMap((material) =>
      apiService.post<MaterialEntity, MaterialCreate>('/material', material).pipe(
        map((material) => materialsActions.createMaterialSuccess({ material })),
        catchError((error) => {
          console.error('Error', error);
          return of(materialsActions.createMaterialFailure({ error }));
        })
      )
    )
  );
}, { functional: true });

export const deleteMaterial$ = createEffect((
    actions$ = inject(Actions),
    apiService = inject(ApiService)
  ) => actions$.pipe(
    ofType(materialsActions.deleteMaterial),
    switchMap(({ id }) =>
      apiService.delete(`/material/${id}`).pipe(
        map(() => materialsActions.deleteMaterialSuccess({ id })),
        catchError((error) => {
          console.error('Error', error);
          return of(materialsActions.deleteMaterialFailure({ error }));
        })
      )
    )
  ),
  { functional: true }
);
