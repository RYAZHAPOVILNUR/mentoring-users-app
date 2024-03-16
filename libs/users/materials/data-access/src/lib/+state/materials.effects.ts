import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { MATERIALS_API_PATHS } from './materials-api.constants';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { Material } from '../models/material.model';
import { CreateMaterial } from '../models/create-material.model';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>(MATERIALS_API_PATHS.folders).pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            return of(MaterialsActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ title }: { title: string }) =>
        apiService.post<Folder, { title: string }>(MATERIALS_API_PATHS.folders, { title: title }).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ folder })),
          catchError((error) => {
            return of(MaterialsActions.addFolderFailure({ error }));
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
      switchMap(({ id }: { id: number }) =>
        apiService.delete(`${MATERIALS_API_PATHS.folders}/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            return of(MaterialsActions.deleteFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadCurrentFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.currentFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<Folder>(`${MATERIALS_API_PATHS.folders}/${params['id']}`).pipe(
          map((folder) => MaterialsActions.currentFolderSuccess({ folder })),
          catchError((error) => {
            return of(MaterialsActions.currentFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<Material[]>(MATERIALS_API_PATHS.materials).pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ material }) =>
        apiService.post<Material, CreateMaterial>(MATERIALS_API_PATHS.materials, material).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
          catchError((error) => {
            return of(MaterialsActions.addMaterialFailure({ error }));
          })
        )
      )
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
      switchMap(({ id }: { id: number }) =>
        apiService.delete(`${MATERIALS_API_PATHS.materials}/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            return of(MaterialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
