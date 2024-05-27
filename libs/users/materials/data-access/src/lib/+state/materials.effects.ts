import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateFolder, CreateMaterial, FolderDTO, MaterialDTO } from '../models/types';


export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(
        () => apiService.get<MaterialDTO[]>('/material').pipe(
          map(
            (materials) => MaterialsActions.loadMaterialsSuccess({ materials })
          ),
          catchError(({ error }) => {
            console.error(`Error ${error}`)
            return of(MaterialsActions.loadMaterialsFailure)
          })
        )
      )
    )
  }, { functional: true }
);

export const loadFolders = createEffect(
  () => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(
        () => apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders) => { return MaterialsActions.loadFoldersSuccess({ folders }) }),
          catchError((error) => {
            console.log('Error ' + error)
            return of(MaterialsActions.loadFoldesFailure({ error }))
          }
          )
        )
      )
    )

  }, { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ newFolder }) => apiService.post<FolderDTO, CreateFolder>('/folder', newFolder).pipe(
        map((newFolder) => MaterialsActions.addFolderSuccess({ newFolder })),
        catchError((error) => {
          console.log(`Error ${error}`);
          return of(MaterialsActions.addFolderFailure({ error }))
        })
      ))
    )
  }, { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) => apiService.delete<void>(`/folder/${id}`).pipe(
        map(
          () => MaterialsActions.deleteFolderSuccess({ id })
        ),
        catchError((error) => {
          console.error(`Error: ${error}`);
          return of(MaterialsActions.deleteFolderFailure({ error }))
        })
      ))
    )
  }, { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(
        ({ newMaterial }) => apiService.
          post<MaterialDTO, CreateMaterial>('/material', newMaterial).pipe(
            map(
              (newMaterial) => MaterialsActions.addMaterialSuccess({ newMaterial })
            ),
            catchError(({ error }) => {
              console.error(`Error: ${error}`);
              return of(MaterialsActions.addMaterualFailure({ error }))
            })
          )
      )
    )
  }, { functional: true }
);

export const deleteMAterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(
        ({ id }) => apiService.delete<void>(`/material/${id}`).pipe(
          map(
            () => MaterialsActions.deleteMaterialSuccess({ id })
          ),
          catchError(({ error }) => {
            console.error(`Error: ${error}`)
            return of(MaterialsActions.deleteMaterialFailure({ error }))
          })
        )
      )
    )
  }, { functional: true }
)
