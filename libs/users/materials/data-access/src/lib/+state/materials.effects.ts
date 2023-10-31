import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {  mergeMap, withLatestFrom } from 'rxjs/operators';
import {switchMap, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { map } from 'rxjs/operators';
import { ApiService } from '@users/core/http';
import { Folder, Material } from '../model/materials.model';
import { CreateFolder } from '../model/create-folder.model';
import { selectRouteParams } from '@users/core/data-access';
import { CreateMaterial } from '../model/create-material.model';

@Injectable()
export class MaterialsEffects {
  addFolderEffect$ = createEffect(() => {
    const apiService = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
          map((newFolder) => {
            return MaterialsActions.addFolderSuccess({ newFolder });
          })
        )
      )
    );
  });

  loadFolders$ = createEffect(() => {
    const api = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      mergeMap(() =>
        api
          .get<Folder[]>('/folder')
          .pipe(
            map((folders) => MaterialsActions.loadFoldersSuccess({ folders }))
          )
      )
    );
  });

  getFolderForRead$ = createEffect(() => {
    const store = inject(Store);
    const apiService = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.getFolderForRead),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService
          .get<Folder>(`/folder/${params['id']}`)
          .pipe(
            map((folder) => MaterialsActions.getFolderForReadSucces({ folder }))
          );
      })
    );
  });

  deleteFolder$ = createEffect(() => {
    const apiService = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      mergeMap(({ id }) => {
        return of(1).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id }))
        );
        // return apiService
        //   .delete(`/folder/${id}`)
        //   .pipe(map(() => MaterialsActions.deleteFolderSuccess({ id })));
      })
    );
  });

  // materials========================
  loadMaterials$ = createEffect(() => {
    const api = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      mergeMap(() =>
        api
          .get<Material[]>('/material')
          .pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({ materials })
            )
          )
      )
    );
  });

  addMaterialEffect$ = createEffect(() => {
    const apiService = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ material }) => {
        return apiService
          .post<Material, CreateMaterial>('/material', material)
          .pipe(
            map((newMaterial) => {
              return MaterialsActions.addMaterialSuccess({ newMaterial });
            })
          );
      })
    );
  });

  deleteMaterial$ = createEffect(() => {
    const apiService = inject(ApiService);
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      mergeMap(({ id }) => {
        return apiService
          .delete(`/material/${id}`)
          .pipe(map(() => MaterialsActions.deleteMaterialSuccess({ id })));
      })
    );
  });

  constructor(private actions$: Actions) {}
}
