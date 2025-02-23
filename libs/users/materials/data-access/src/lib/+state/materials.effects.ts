import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import { FoldersActions, MaterialsActions } from "./materials.actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { Folder } from "../models/folder.model";
import { Material } from "../models/material.model";
import { Store } from "@ngrx/store";
import { selectRouteParams } from "@users/core/data-access";

export const foldersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>("/folder").pipe(
          map(folders => FoldersActions.loadFoldersSuccess({folders})),
          catchError(error => of(FoldersActions.loadFoldersFailure(error))),
        )
      )
    )
  },
  { functional: true }
)

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolder),
      switchMap(({folder}) =>
        apiService.post<Folder, Folder>("/folder", folder).pipe(
          map((folder) => FoldersActions.loadFolderSuccess({folder})),
          catchError((error) => of(FoldersActions.loadFolderFailure(error)))
        )
      )
    )
  },
  { functional: true }
)
export const deleteFolderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({id}) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({id})),
          catchError(((error) => of(FoldersActions.deleteFolderFailure({error}))))
        )
      )
    )
  },
  { functional: true }
)

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store)

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterails),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({
            materials: materials.filter((material) => material.folder_id === +params['id'])
          })),
          catchError(((error) => of(MaterialsActions.loadMaterialsFailure({error}))))
        )
      )
    )
  },
  { functional: true }
)
export const folderIdEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store)

    return actions$.pipe(
      ofType(FoldersActions.loadFolderId),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([,params]) =>
        apiService.get<Folder>(`/folder/${params['id']}`).pipe(
          map((folder) => FoldersActions.loadFolderSuccess({folder})),
          catchError((error) => of(FoldersActions.loadFolderFailure(error)))
        )
      )
    )
  },
  { functional: true }
)
export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const materialPost = {
          ...material,
          folder_id: params['id']
        }

        return apiService.post<Material, Material>('/material', materialPost).pipe(
          map((material) => MaterialsActions.loadMaterialSuccess({
            material
          })),
          catchError(((error) => of(MaterialsActions.loadMaterialFailure({error}))))
        )
  })
    )
  },
  { functional: true }
)
export const deleteMaterialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterail),
      switchMap(({id}) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({id})),
          catchError(((error) => of(MaterialsActions.deleteMaterialFailure({error}))))
        )
      )
    )
  },
  { functional: true }
)