import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialsDTO } from '../../models/materials-dto.model';
import { materialsDTOAdapter } from '../../adapters/material-dto.adapter';
import { CreateMaterialsDTO } from '../../models/create-materials-dto.model';
import { CreateMaterialsEntity } from '../../models/create-material.entity';

@Injectable()
export class MaterialsEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);

  loadMaterials = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      concatMap(() =>
        this.apiService.get<MaterialsDTO[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({
            materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material))
          })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  });

  addMaterial = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      map(({ materialData }) => materialsDTOAdapter.entityToDTO<CreateMaterialsEntity, CreateMaterialsDTO>(materialData)),
      concatMap((materialData) =>
        this.apiService.post<MaterialsDTO, CreateMaterialsDTO>('/material', materialData).pipe(
          map((materialData) => materialsDTOAdapter.DTOtoEntity(materialData)),
          map((materialData) => MaterialsActions.addMaterialSuccess({ materialData })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        )
      )
    );
  });

  deleteFolder = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      concatMap(({id}) => 
        this.apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({id})),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        )
      )
    )
  });
}
