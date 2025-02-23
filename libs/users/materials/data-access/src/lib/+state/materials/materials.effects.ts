import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import { materialsDTOAdapter, MaterialsDTO, MaterialsEntity, FileFormat } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { select, Store } from '@ngrx/store';
import { selectMaterialsEntities } from './materials.selectors';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@libs/users/materials/feature-materials-content/feature-materials-content';

@Injectable()
export class MaterialsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly materialsEntities$ = inject(Store).pipe(select(selectMaterialsEntities));
  private readonly dialog = inject(MatDialog);

  initMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() => {
        return this.apiService.get<MaterialsDTO[]>('/material').pipe(
          map((materials) => {
            return MaterialsActions.loadMaterialsSuccess({
              materials: materials.map((material) => {
                const link = material.material_link || '';

                let materialFormat: FileFormat = 'Unknown';

                switch (true) {
                  case /youtube\.com|youtu\.be/.test(link):
                    materialFormat = 'Video';
                    break;
                  case /\.(mp3|wav|ogg)(\?.*)?$/i.test(link):
                    materialFormat = 'Audio';
                    break;
                  case /\.(pdf)(\?.*)?$/i.test(link):
                    materialFormat = 'PDF';
                    break;
                }
                return materialsDTOAdapter.DTOtoEntity({
                  ...material,
                  material_format: materialFormat,
                });
              }),
            });
          }),
          catchError((error) => {
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        );
      })
    )
  );

  addMaterial$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.addMaterial),
        switchMap(({ materialData }) => {
          return this.apiService
            .post<MaterialsDTO, MaterialsDTO>('/material', materialsDTOAdapter.entityToDTO(materialData))
            .pipe(
              map((material) => materialsDTOAdapter.DTOtoEntity(material)),
              map((materialEntity) => {
                return MaterialsActions.addMaterialSuccess({
                  materialData: {
                    ...materialEntity,
                    materialFormat: materialData.materialFormat,
                  },
                });
              }),
              catchError((error) => {
                console.error('Error', error);
                return of(MaterialsActions.addMaterialFailed({ error }));
              })
            );
        })
      );
    },
    { functional: true }
  );

  deleteMaterial$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.deleteMaterial),
        switchMap(({ id }) =>
          this.apiService.delete<void>(`/material/${id}`).pipe(
            map(() => MaterialsActions.deleteMaterialSuccess({ id })),
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

  openMaterial$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.getMaterialById),
        withLatestFrom(this.materialsEntities$),
        filter(([{ materialId }, materialsEntities]) => Boolean(materialsEntities[materialId])),
        map(([{ materialId }, materialsEntities]) => materialsEntities[materialId]),
        tap((material) => {
          console.log(material);
          this.dialog.open(MaterialsContentComponent, {
            data: {
              dialogText: 'Material',
              materialById$: material,
            },
            autoFocus: false,
          });
        })
      );
    },
    { dispatch: false }
  );
}
