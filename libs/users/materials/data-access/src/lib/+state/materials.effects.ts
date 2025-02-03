import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { IAddFolder } from '../models/folder-add.model';
import { IFolder } from '../models/folder.model';
import { IAddMaterial } from '../models/materials-add.model';
import { IMaterial } from '../models/materials.model';
import * as MaterialsActions from './materials.actions';

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initFolders),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            return of(MaterialsActions.loadFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          map((response) => MaterialsActions.addFolderSuccess({ folder: response })),
          catchError((error) => {
            return of(MaterialsActions.addFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            return of(MaterialsActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            return of(MaterialsActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ material }) =>
        apiService.post<IMaterial, IAddMaterial>('/material', material).pipe(
          map((response) => MaterialsActions.addMaterialSuccess({ material: response })),
          catchError((error) => {
            return of(MaterialsActions.addMaterialFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
          map((folder) => MaterialsActions.loadFolderSuccess({ folder })),
          catchError((error) => {
            return of(MaterialsActions.loadFolderFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) => {
        return apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            return of(MaterialsActions.deleteMaterialFailed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
