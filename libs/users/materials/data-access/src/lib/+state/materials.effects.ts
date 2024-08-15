import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, filter } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';
import { MaterialDTO, materialsDTOAdapter } from '@users/core/data-access';

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

export const addNewFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.addFolder),
      switchMap(({ newFolderData, showSnackbarAddFolderSuccess }) =>
        apiService.post<Folder, AddFolder>('/folder', newFolderData).pipe(
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
            return of(materialsActions.deleteFolderFailed({ error }));
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
          tap((materialsDTO) => console.log('effect, materialsDTO', materialsDTO)),
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
