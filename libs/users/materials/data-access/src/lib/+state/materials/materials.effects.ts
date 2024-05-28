import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Material } from '../../models/folders.interface';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  public loadMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(({ folderId }) =>
        this.apiService.get<Material[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter((material) => material.folder_id === folderId),
            })
          ),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
        )
      )
    );
  });

  public createMaterial = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.createMaterial),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([createMaterial, params]) =>
        this.apiService
          .post<Material, { title: string; material_link: string; folder_id: number }>('/material', {
            title: createMaterial.title,
            material_link: createMaterial.material_link,
            folder_id: +params?.['id'],
          })
          .pipe(
            map((material) => MaterialsActions.createMaterialSuccess({ material })),
            catchError((error) => {
              return of(MaterialsActions.createMaterialFailure(error));
            })
          )
      )
    );
  });

  public deleteMaterial = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        this.apiService.delete<void>(`/material/${id}`).pipe(map(() => MaterialsActions.deleteMaterialSuccess({ id })))
      ),
      catchError((error) => {
        return of(MaterialsActions.deleteMaterialFailure(error));
      })
    );
  });
}
