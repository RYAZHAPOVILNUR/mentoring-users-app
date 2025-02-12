import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "@users/core/http";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import *as MaterialsActions from './materials.actions'
import { Folder, FolderCreate } from "./models/folders.interface";
import { Material, MaterialCreate } from './models/materials.interface';
import { Store } from "@ngrx/store";
import { selectRouteParams } from "@users/core/data-access";


export const loadFoldersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({folders})),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({error}))),
        )
      )
    )
  }, {functional: true}
)

export const deleteFoldersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolders),
      switchMap(({id}) =>
        apiService.delete<Folder>(`/folder/${id}`).pipe(
          map((folders) => MaterialsActions.deleteFoldersSuccess({id})),
          catchError((error) => of(MaterialsActions.deleteFoldersFailure({error}))),
        )
      )
    )
  }, {functional: true}
)

export const addFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({folder}) =>
        apiService.post<Folder, FolderCreate>('/folder', folder).pipe(
          map((folder: Folder) => MaterialsActions.addFolderSuccess({folder})),
          catchError((error) => {
            console.error('Error response:', error);
            return of(MaterialsActions.addFolderFailure({ error }));
        })
        )
      )
    )
  }, {functional: true}
)

export const loadMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store)

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialSuccess({ materials })),
          catchError((error) => of(MaterialsActions.loadMaterialFailure({ error })))
        )
      )
    )
  }, {functional: true}
)

export const deleteMaterialsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({id}) =>
        apiService.delete<Material>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({id})),
          catchError((error) => of(MaterialsActions.deleteMaterialFailure({error}))),
        )
      )
    )
  }, {functional: true}
)



export const addMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({material}) =>
        apiService.post<Material, MaterialCreate>('/material', material).pipe(
          map((material: Material) => MaterialsActions.addMaterialSuccess({material})),
          catchError((error) => {
            console.error('Error response:', error);
            return of(MaterialsActions.addMaterialFailure({ error }));
          })
        )
      )
    )
  }, {functional: true}
)

