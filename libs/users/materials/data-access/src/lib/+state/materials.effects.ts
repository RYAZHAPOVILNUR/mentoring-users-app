import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { MaterialStatus } from '../enums/materials-status.enum';
import { CreateFolderInput } from '../models/create-folder-input.type';
import { Material } from '../models/material.interface';
import { getMaterialsByFolderId } from '../helpers/materials.helper';
import { CreateMaterialInput } from '../models/create-material-input.interface';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) =>
            MaterialsActions.loadFoldersSuccess({
              folders,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(
              MaterialsActions.loadFoldersFailure({
                status: MaterialStatus.Error,
                error,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService
          .delete<void>(`/folder/${id}`)
          .pipe(map(() => MaterialsActions.deleteFolderSuccess({ id })))
      ),
      catchError((error) => {
        console.error(error);
        return of(MaterialsActions.deleteFolderFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const createFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.createFolder),
      switchMap(({ createFolderInput }) =>
        apiService
          .post<Folder, CreateFolderInput>('/folder', createFolderInput)
          .pipe(
            map((folder) => MaterialsActions.createFolderSuccess({ folder }))
          )
      ),
      catchError((error) => {
        console.error(error);
        return of(MaterialsActions.createFolderFailure(error));
      })
    );
  },
  { functional: true }
);

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService$ = inject(ApiService);
    let folderId: number;

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      tap((value) => (folderId = value.folderId)),
      switchMap(() =>
        apiService$.get<Material[]>('/material').pipe(
          map((allMaterials) => getMaterialsByFolderId(allMaterials, folderId)),
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({ materials })
          )
        )
      ),
      catchError((error) => {
        console.log(error);
        return of(MaterialsActions.loadMaterialsFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const createMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService$ = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.createMaterial),
      switchMap(({ createMaterialInput }) =>
        apiService$
          .post<Material, CreateMaterialInput>('/material', createMaterialInput)
          .pipe(
            map((material) =>
              MaterialsActions.createMaterialSuccess({ material })
            )
          )
      ),
      catchError((error) => {
        console.log(error);
        return of(MaterialsActions.createMaterialFailure({ error }));
      })
    );
  },
  { functional: true }
);

export const deleteMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService
          .delete<void>(`/material/${id}`)
          .pipe(map(() => MaterialsActions.deleteMaterialSuccess({ id })))
      ),
      catchError((error) => {
        console.error(error);
        return of(MaterialsActions.deleteMaterialFailure({ error }));
      })
    );
  },
  { functional: true }
);
