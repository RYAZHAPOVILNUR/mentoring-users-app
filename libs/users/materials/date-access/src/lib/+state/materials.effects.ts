import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as MaterialsActions from './materials.actions';

import { ApiService } from '@users/core/http';
import { FolderDTO, MaterialDTO } from './materials.models';

export const foldersInitEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.initFolders),
      switchMap(() =>
        api.get<FolderDTO>('/folder').pipe(
          map((folders: any) => {
            return MaterialsActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => of(MaterialsActions.loadFoldersFailure(error)))
        )
      )
    ),
  { functional: true }
);

export const materialAddFolderEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.setAddFolder),
      switchMap(({ newData }) =>
        api.post('/folder', newData).pipe(
          map((newData: any) => {
            return MaterialsActions.setAddFolderSuccess({ newData });
          }),
          catchError((error) => of(MaterialsActions.setAddFolderFailed({ error })))
        )
      )
    ),
  { functional: true }
);

export const materialDeleteFolderEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.setDeleteFolder),
      switchMap(({ id }) =>
        api.delete(`/folder/${id}`).pipe(
          map(() => {
            return MaterialsActions.setDeleteFolderSuccess({ id });
          }),
          catchError((error) => of(MaterialsActions.setAddFolderFailed({ error })))
        )
      )
    ),
  { functional: true }
);

export const materialsInitEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(({ id }) =>
        api.get<FolderDTO>('/material').pipe(
          map((res: any) => {
            const materials = res.filter((item: MaterialDTO) => item.folder_id === Number(id));

            return MaterialsActions.loadMaterialsSuccess({ materials });
          }),
          catchError((error) => of(MaterialsActions.loadFoldersFailure(error)))
        )
      )
    ),
  { functional: true }
);

export const materialAddEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.setAddMaterial),
      switchMap(({ data }) =>
        api.post('/material', data).pipe(
          map((data: any) => {
            return MaterialsActions.setAddMaterialSuccess({ data });
          }),
          catchError((error) => of(MaterialsActions.setAddFolderFailed({ error })))
        )
      )
    ),
  { functional: true }
);

export const materialDeleteEffect$ = createEffect(
  (api = inject(ApiService), actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MaterialsActions.setDeleteMaterial),
      switchMap(({ id }) =>
        api.delete(`/material/${id}`).pipe(
          map(() => {
            return MaterialsActions.setDeleteMaterialSuccess({ id });
          }),
          catchError((error) => of(MaterialsActions.setDeleteMaterialFailed({ error })))
        )
      )
    ),
  { functional: true }
);
