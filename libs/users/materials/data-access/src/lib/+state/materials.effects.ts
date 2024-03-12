import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { FoldersActions, MaterialsActions } from './materials.actions'
import { switchMap, catchError, of, map, withLatestFrom, filter, tap, concatMap, combineLatestWith } from 'rxjs';
import { createdFolder, createdMaterial, Folder, Material } from '../model/folder.interface';
import { ActivatedRoute } from "@angular/router";
import { Store } from '@ngrx/store'
import { selectQueryParam, selectRouteParam } from '@users/core/data-access';

export const loadFolders$ = createEffect(
  () => {
    const action$ = inject(Actions)
    const apiService = inject(ApiService)
    return action$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(
        () => apiService.get<Folder[]>('/folder').pipe(
          map(
            (folders) => FoldersActions.loadFoldersSuccess({ data: folders })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }))
          })
        )
      )

    )
  }, { functional: true }
)

export const createFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.createNewFolder),
      switchMap(
        ({ createdFolder }) => apiService.post<Folder, createdFolder>('/folder', createdFolder).pipe(
          map(
            (createdFolder) => FoldersActions.createNewFolderSuccess({ createdFolder })
          ),
          catchError(error => {
            console.error("ERROR", error);
            return of(FoldersActions.createNewFolderFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)

export const deleteFolder$ = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    return action$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(
        ({ id }) => apiService.delete<number>(`/folder/${id}`).pipe(
          map(
            () => FoldersActions.deleteFolderSuccess({ id })
          ),
          catchError(error => {
            console.error("ERROR", error);
            return of(FoldersActions.deleteFolderFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService)
    const folderId$ = inject(Store).select(selectRouteParam('id'));
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(folderId$),
      switchMap(
        ([action, id]) => apiService.get<Material[]>('/material').pipe(
          map((materialArr) => {
            const folderId = id ? +id : 0;
            const filteredMaterials = materialArr.filter(material => material.folder_id === folderId)
            return MaterialsActions.loadMaterialsSuccess({ data: filteredMaterials })
          }),
          catchError(error => {
            console.error("ERROR", error);
            return of(MaterialsActions.loadMaterialsFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)

export const createMaterial$ = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService)
    return action$.pipe(
      ofType(MaterialsActions.createMaterial),
      switchMap(
        ({ createdMaterial }) => apiService.post<Material, createdMaterial>('/material', createdMaterial).pipe(
          map(
            (createdMaterial) => MaterialsActions.createMaterialSuccess({ createdMaterial })
          ),
          catchError(error => {
            console.error("ERROR", error);
            return of(MaterialsActions.createMaterialFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)

export const deleteMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(
        ({ id }) => apiService.delete(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError(error => {
            console.error("ERROR", error);
            return of(MaterialsActions.deleteMaterialFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)