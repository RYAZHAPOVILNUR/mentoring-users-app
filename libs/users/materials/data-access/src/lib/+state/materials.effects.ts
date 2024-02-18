import { inject } from '@angular/core';
import { createEffect, Actions, ofType, FunctionalEffect } from '@ngrx/effects';
import { catchError, of, map, switchMap, concat, withLatestFrom } from 'rxjs';
import { foldersActions, materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { MaterialCreate } from '../models/material-create.model';
import { Store } from '@ngrx/store';
import { selectCurrentFolder } from './materials.selectors';
import { selectRouteParams } from '@users/core/data-access';

export const loadFolders$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(foldersActions.loadFolders),
      switchMap(() => {
        return apiService.get<Folder[]>('/folder')
          .pipe(
            map((folders: Folder[]) => {
              return foldersActions.loadFoldersSuccess({ folders });
            }),
            catchError((error) => {
              return of(foldersActions.loadFoldersFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const loadCurrentFolder$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService),
    store: Store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(foldersActions.loadCurrentFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([,routerParams]) => {
        const currentFolderId: string = routerParams['id'];
        return apiService.get<Folder>(`/folder/${currentFolderId}`)
          .pipe(
            map((folder: Folder) => {
              return foldersActions.loadCurrentFolderSuccess({ folder });
            }),
            catchError((error: Error) => {
              return of(foldersActions.loadCurrentFolderFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const createFolder$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(foldersActions.createFolder),
      switchMap(({ title }: { title: string}) => {
        return apiService.post<Folder, { title: string }>('/folder', { title: title })
          .pipe(
            map((folder: Folder) => {
              return foldersActions.createFolderSuccess({ folder });
            }),
            catchError((error) => {
              return of(foldersActions.createFolderFailed({ error }))
            })
          )
      })
    )
  },
  { functional: true }
);

export const removeFolder$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(foldersActions.removeFolder),
      switchMap(({ id }: { id: number }) => {
        return apiService.delete(`/folder/${id}`)
          .pipe(
            switchMap((res) => concat(
              of(foldersActions.removeFolderSuccess()),
              of(foldersActions.loadFolders())
            )),
            catchError((error: Error) => {
              return of(foldersActions.removeFolderFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const loadMaterials$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
    ) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() => {
        return apiService.get<Material[]>('/material')
          .pipe(
            map((materials: Material[]) => {
              return materialsActions.loadMaterialsSuccess({ materials });
            }),
            catchError((error: Error) => {
              return of(materialsActions.loadMaterialsFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const addMaterial$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService),
    store: Store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(materialsActions.addMaterial),
      withLatestFrom(store.select(selectCurrentFolder)),
      switchMap(([{ material }, folder]) => {
        const newMaterial: MaterialCreate = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folder!.id
        };
        return apiService.post<Material, MaterialCreate>('/material', newMaterial)
          .pipe(
            switchMap((material: Material) => concat(
              of(materialsActions.addMaterialSuccess({ material })),
              of(materialsActions.loadMaterials()),
            )),
            catchError((error: Error) => {
              return of(materialsActions.addMaterialFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);

export const removeMaterial$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(materialsActions.removeMaterial),
      switchMap(({ materialId }: { materialId: number}) => {
        return apiService.delete(`/material/${materialId}`)
          .pipe(
            switchMap((res) => concat(
              of(materialsActions.removeMaterialSuccess()),
              of(materialsActions.loadMaterials())
            )),
            catchError((error: Error) => {
              return of(materialsActions.removeMaterialFailed({ error }));
            })
          )
      })
    )
  },
  { functional: true }
);
