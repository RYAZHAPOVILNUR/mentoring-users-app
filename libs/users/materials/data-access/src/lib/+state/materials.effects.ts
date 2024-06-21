import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { IAddFolder, IFolder } from '../models/folder.model';
import { IAddMaterial, IMaterial } from '../models/material.model';
import { selectRouteParams } from '@users/core/data-access';
import { Store } from '@ngrx/store';

export const materialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      // delay(1500),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder')
        .pipe(
          map((folders) =>
            MaterialsActions.loadFoldersSuccess({
              folders: folders.map((folder) => folder),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) => 
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteFolderFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true}
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({title}) =>
        apiService.post<IFolder, IAddFolder>('/folder',title)
      .pipe(
          map((folder) => MaterialsActions.addFolderSuccess({folder})),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addFolderFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true}
);

export const materialsInit = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => 
        apiService.get<IMaterial[]>('/material')
        .pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter(
                (material) => material.folder_id === +params['id'] || material.folder_id === 897
              )
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{newMaterial}, params]) => {
        const folderId = +params['id'];
        const materialWithFolderId: IAddMaterial = {
          title: newMaterial.title,
          material_link: newMaterial.material_link,
          folder_id: folderId
        }

        return apiService.post<IMaterial, IAddMaterial>('/material',materialWithFolderId)
        .pipe(
            map((newMaterial) => MaterialsActions.addMaterialSuccess({newMaterial})),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.addMaterialFailure({ error }));
            })
          )
      })
    )
  },
  { functional: true}
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) => 
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    )
  },
  { functional: true}
);