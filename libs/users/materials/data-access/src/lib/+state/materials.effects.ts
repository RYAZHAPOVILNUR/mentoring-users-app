import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { MaterialsActions } from './materials.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AddMaterialDTO, MaterialDTO } from '../models/material.model';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadMaterials$ = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(MaterialsActions.loadMaterials),
    switchMap(() =>
      apiService.get<MaterialDTO[]>('/material').pipe(
        map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
        catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
      )
    )
  );
}, { functional: true });

export const deleteMaterial = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      tap(({ id }) => console.log('Delete material started with ID:', id)),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => {
            console.log('Delete material succeeded for ID:', id);
            return MaterialsActions.deleteMaterialSuccess({ id });
          }),
          catchError((error) => {
            console.error('Error during delete material:', error);
            return of(MaterialsActions.deleteMaterialFailure({ error }));
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
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);

        const materialWithFolderId: AddMaterialDTO = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId
        }

        return apiService.post<MaterialDTO, AddMaterialDTO>('/material', materialWithFolderId).pipe(
          map((newMaterial) =>
            MaterialsActions.addMaterialSuccess({ material: newMaterial })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.addMaterialFailure({ error }))
          })
        )}
      ))
  }, {functional: true}
)
