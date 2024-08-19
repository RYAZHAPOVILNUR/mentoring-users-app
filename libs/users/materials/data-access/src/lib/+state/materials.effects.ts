import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';
import { MaterialDTO, materialsDTOAdapter } from '@users/core/data-access';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { AddNewMaterial } from '../models/add-new-material.model';
import { MaterialVM } from '../models/material.model';

export const initMaterials = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.initMaterials),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          tap((folders) => console.log('effect, folders', folders)),
          map((folders) => materialsActions.initMaterialsSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.initMaterialsFailure());
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.addFolder),
      switchMap(({ folderData, showSnackbarAddFolderSuccess }) =>
        apiService.post<Folder, AddFolder>('/folder', folderData).pipe(
          map((newFolder) => ({ newFolder, showSnackbarAddFolderSuccess })),
          tap(({ showSnackbarAddFolderSuccess }) => showSnackbarAddFolderSuccess()),
          map(({ newFolder }) => materialsActions.addFolderSuccess({ newFolder }))
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.deleteFolder),
      switchMap(({ id, showSnackbarDeleteFolderSuccess }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => materialsActions.deleteFolderSuccess({ id })),
          tap(() => showSnackbarDeleteFolderSuccess()),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// This effect gets materials from server and loads to state only valid materials, ignoring materials with links starts with not 'http'. This filter needs only wile server gives invalid materials.
export const loadMaterials = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialDTO[]>('/material').pipe(
          map((unfilteredMaterialsDTO) => unfilteredMaterialsDTO.filter(unfilteredMaterial => unfilteredMaterial.material_link.startsWith('http'))),
          map((materialsDTO) => {
            const materials = materialsDTO.map((materialDTO) => materialsDTOAdapter.DTOtoVM(materialDTO))
            console.log('materialVM in Effects', materials);
            return materialsActions.loadMaterialsSuccess({materials})
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.loadMaterialsFailure());
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(materialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      tap(([{material}, params]) => {
        console.log('material in ef', material);
        console.log('params id in ef', params['id'] );
      }),
      switchMap(([{material}, params]) => {
        const newMaterial = {
          ...material,
          folder_id: Number(params['id'])
        }
        console.log('newMaterial', newMaterial);

        return apiService.post<MaterialVM, AddNewMaterial>('/material', newMaterial).pipe(
          map((materialDTO) => {
            const material = materialsDTOAdapter.DTOtoVM(materialDTO)
            return materialsActions.addMaterialSuccess({material})
          }),
          catchError((error) => {
            console.log('Error', error);
            return of(materialsActions.addMaterialFailure())
          })
        )
      })
    )
  },
  { functional: true}
);

export const deleteMaterial = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.deleteMaterial),
      switchMap(({id}) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => materialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true }
);

export const loadFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(materialsActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>{
        console.log('params in effects', params)
        return apiService.get<Folder>(`/folder/${params['id']}`).pipe(
          map((folder) => materialsActions.loadFolderSuccess({folder})),
          catchError((error) => {
            console.log('Error', error);
            return of(materialsActions.loadFolderFailure(error))

          } )
        )
      }
      )
    )
  },
  { functional: true}
)

