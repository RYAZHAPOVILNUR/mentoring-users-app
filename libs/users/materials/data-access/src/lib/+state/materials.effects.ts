import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { CreateFolder } from '../models/create-folder.model';
import { Material } from '../models/materials.model';
import { CreateMaterial } from '../models/create-materials.model';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() => 
          apiService.get<Folder[]>('/folder').pipe(
            map((folders) => 
              MaterialsActions.loadFoldersSuccess({ folders })
            ),
            catchError((error) => {console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }))
            })
            )
        )
      )
    }, {functional: true}
  );
  deleteFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.deleteFolder),
        switchMap(({ id }) => 
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() => MaterialsActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteFolderFailure({ error }))
            })
          )
        )
      )
    }
  );
  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folderData }) =>
          apiService.post<Folder, CreateFolder>('/folder', folderData).pipe(
            map((folder) => MaterialsActions.addFolderSuccess({ folderData: folder })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }));
            })
          )
        )
      )
    }
  );
  loadMaterials = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.loadMaterials),
        switchMap(() => 
          apiService.get<Material[]>('/material').pipe(
            map(( materials ) => MaterialsActions.loadMaterialsSuccess({ materials })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadMaterialsFailure({ error }))
            })
          )
        )
      )
    }
  );
  deleteMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.deleteMaterial),
        switchMap(({ id }) =>
          apiService.delete<void>(`/material/${id}`).pipe(
            map(() => MaterialsActions.deleteMaterialSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteMaterialFailure({ error }))
            })
          )
        )
      )
    }
  )
  addMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.addMaterial),
        switchMap(({ materialData }) =>
          apiService.post<Material, CreateMaterial>('/material', materialData).pipe(
            map((material) => MaterialsActions.addMaterialSuccess({ materialData: material })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.addMaterialFailure({ error }));
            })
          )
        )
      )
    }
  );
}