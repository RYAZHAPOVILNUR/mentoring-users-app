import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
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
      ofType(materialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => materialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.loadFoldersFailure({ error }));
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

// Этот эффект получает материалы с сервера, и загружает в стейт только те из них, у которых валидная ссылка (содержит http в начале строки). Фильтр нужен только до тех пор, пока сервер отдает некорректные материалы.
export const loadMaterials = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<MaterialDTO[]>('/material').pipe(
          map((unfilteredMaterialsDTO) =>
            unfilteredMaterialsDTO.filter((unfilteredMaterial) => unfilteredMaterial.material_link.startsWith('http'))
          ),
          map((materialsDTO) => {
            const materials = materialsDTO.map((materialDTO) => materialsDTOAdapter.DTOtoVM(materialDTO));
            return materialsActions.loadMaterialsSuccess({ materials });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.loadMaterialsFailure({ error }));
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
      switchMap(([{ material }, params]) => {
        const newMaterial = {
          ...material,
          folder_id: Number(params['id']),
        };
        return apiService.post<MaterialVM, AddNewMaterial>('/material', newMaterial).pipe(
          map((materialDTO) => {
            const material = materialsDTOAdapter.DTOtoVM(materialDTO);
            return materialsActions.addMaterialSuccess({ material });
          }),
          catchError((error) => {
            console.log('Error', error);
            return of(materialsActions.addMaterialFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => materialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(materialsActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<Folder>(`/folder/${params['id']}`).pipe(
          map((folder) => materialsActions.loadFolderSuccess({ folder })),
          catchError((error) => {
            console.log('Error', error);
            return of(materialsActions.loadFolderFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
