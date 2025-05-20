import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { AddMaterialsType, MaterialsType } from '../../models/material.type';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  loadMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([, params]) =>
        this.apiService.get<MaterialsType[]>('/material').pipe(
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
  },
   { functional: true }
);

  addFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);

        const materialWithFolderId: AddMaterialsType = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId
        };

      return this.apiService.post<MaterialsType, AddMaterialsType>('/material', materialWithFolderId).pipe(
        map((material) => MaterialsActions.addMaterialSuccess({ material })),
        catchError((error) => {
          console.error('Error', error);
          return of(MaterialsActions.addMaterialFailed({ error }));
        })
      );
    })
    );
  }, { functional: true }
)

  deleteMaterial$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        this.apiService.delete(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        )
      )
    );
  }, { functional: true }
  );
}
