import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap } from 'rxjs';
import * as MaterialAction from './matearial.action';
import { ApiService } from '@users/core/http';
import { CreateFolder, CreateMaterial, Folder, Material } from '../model/material.interface';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const loadFoldereffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialAction.initFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          tap((item) => console.log(item)),
          map((folders) => MaterialAction.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.loadFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadOpenedMaterials = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return action$.pipe(
      ofType(MaterialAction.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) =>
            MaterialAction.loadMaterialSuccess({
              materials: materials.filter((material) => material.folder_id === +params['id']),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.loadMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialAction.createFolder),
      tap((folder) => console.log('createFolder', folder)),
      switchMap(({ folder }) =>
        apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
          map((folder) =>
            MaterialAction.createFolderSuccess({
              newFolder: folder,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.createFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createMaterials = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialAction.createMaterial),
      switchMap(({ material }) =>
        apiService.post<Material, CreateMaterial>('/material', material).pipe(
          tap((item) => console.log(item)),
          map((materials) => MaterialAction.createMaterialSuccess({ newMaterial: materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.createMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialAction.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialAction.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.deleteFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialAction.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialAction.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialAction.deleteMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
