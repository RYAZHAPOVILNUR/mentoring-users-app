import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { MaterialsActions } from './materials.actions';
import { catchError, filter, map, of, skip, switchMap, take } from 'rxjs';
import { FolderDTO, MaterialDTO, CreateMaterial } from '../types';
import { select, Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const foldersLoad = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(
        () => apiService.get<FolderDTO[]>('/folder').pipe(
          map(
            (folders) => MaterialsActions.loadFoldersSuccess({ folders })
          ),
          catchError((error) => {
              console.error('Error ' + error.message.toString());
              return of(MaterialsActions.loadFoldersFailure({ error }));
            }
          )
        )
      )
    );
  }, { functional: true }
);
export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(
        ({ id }) => apiService.delete(`/folder/${id}`).pipe(
          map(
            () => MaterialsActions.deleteFolderSuccess({ id })
          ),
          catchError((error) => {
            console.error('Error: ' + error.message.toString());
            return of(MaterialsActions.deleteFolderFailure({ error }));
          })
        )
      )
    );
  }, { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(
        ({ newFolder }) =>
          apiService.post<FolderDTO, Pick<FolderDTO, 'title'>>('/folder', newFolder).pipe(
            map(
              (newFolder) => MaterialsActions.addFolderSuccess({ newFolder })
            ),
            catchError((error) => {
              console.error('Error: ' + error.message.toString());
              return of(MaterialsActions.addFolderFailure({ error }));
            })
          )
      )
    );
  }, { functional: true }
);

export const openFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const selectedRouteParams = inject(Store).select(selectRouteParams).pipe(skip(1));

    return actions$.pipe(
      ofType(MaterialsActions.openFolder),
      switchMap(() => selectedRouteParams),
      filter(params => params['id'] !== undefined),
      take(1),
      switchMap((params) =>
        apiService.get<FolderDTO>(`/folder/${params['id']}`).pipe(
          map(folder =>
            MaterialsActions.openFolderSuccess({ folder })
          ),
          catchError((error) => {
              console.log('Error: ' + error.message.toString());
              return of(MaterialsActions.openFolderFailure({ error }));
            }
          ),

        )
      )
    );
  }, { functional: true }
);

//doesn't work without switchMap in switchMap
export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const selectedRouteParams = inject(Store).select(selectRouteParams);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(
        () => selectedRouteParams.pipe(
          switchMap(params =>
            apiService.get<MaterialDTO[]>('/material').pipe(
              map((materials) => {
                const filteredMaterials = materials.filter(material => material.folder_id === Number(params['id']));
                return MaterialsActions.loadMaterialsSuccess({ materials: filteredMaterials });
              }),
              catchError(({ error }) => {
                console.error('Error: ' + error.message.toString());
                return of(MaterialsActions.loadMaterialsFailure({ error }));
              })
            )
          ))
      ));
  }, { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(
        ({ id }) => apiService.delete(`/material/${id}`).pipe(
          map(
            () => MaterialsActions.deleteMaterialSuccess({ id })
          ),
          catchError(({ error }) => {
            console.error('Error: ' + error.message.toString());
            return of(MaterialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    );
  }, { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(
        ({ newMaterial }) =>
          apiService.post<MaterialDTO, CreateMaterial>('/material', newMaterial).pipe(
            map(
              (newMaterial) => MaterialsActions.addMaterialSuccess({ newMaterial })
            ),
            catchError(({ error }) => {
              console.error('Error: ' + error.message.toString());
              return of(MaterialsActions.addMaterialFailure({ error }));
            })
          )
      )
    );
  }, { functional: true }
);
