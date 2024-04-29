import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { MaterialsActions } from './materials.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Material } from './materials.reducer';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  public loadMaterials = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.loadMaterials),
        withLatestFrom(this.store.select(selectRouteParams)),
        switchMap(([, params]) =>
          this.apiService.get<Material[]>('/material').pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({
                materials: materials.filter((material) => material.folder_id === +params['id']),
              })
            ),
            catchError((error) => {
              return of(MaterialsActions.loadMaterialsFailed({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  public createMaterial = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.createMaterial),
        withLatestFrom(this.store.select(selectRouteParams)),
        switchMap(([createMaterial, params]) =>
          this.apiService
            .post<Material, any>('/material', {
              title: createMaterial.title,
              material_link: createMaterial.material_link,
              folder_id: params?.['id'],
            })
            .pipe(
              map((material) => MaterialsActions.createMaterialSuccess({ material })),
              catchError((error) => {
                return of(MaterialsActions.createMaterialFailed(error));
              })
            )
        )
      );
    },
    {
      functional: true,
    }
  );

  public deleteMaterial = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.deleteMaterial),
        switchMap(({ id }) =>
          this.apiService.delete<Material>(`/material/${id}`).pipe(
            map(() => MaterialsActions.deleteMaterialSuccess({ id })),
            catchError((error) => {
              return of(MaterialsActions.deleteMaterialFailed(error));
            })
          )
        )
      );
    },
    { functional: true }
  );
}
