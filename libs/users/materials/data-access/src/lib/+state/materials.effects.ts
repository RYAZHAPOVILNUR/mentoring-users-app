import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as  MaterialsActions  from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { FolderAdd } from '../models/folder-add.model';
import { Material } from '../models/material.model';
import { Router } from '@angular/router';
import { MaterialAdd } from '../models/material-add.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';


export const initialFolders = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiServise = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.initFolders),
      switchMap(
        () => apiServise.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({folders})),
          catchError((error) => {
            console.log('Error ' + error.message);
            return of(MaterialsActions.loadFoldersFaild({error}));
          })
        )
      )
    )
  },
  { functional: true }
)

export const createFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiServise = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.createFolders),
      switchMap(
        ({folder}) => apiServise.post<Folder, FolderAdd>('/folder', folder).pipe(
          map((newFolders) => MaterialsActions.createFoldersSuccess({folder: newFolders})),
          catchError((error) => {
            console.log('Error ' + error.message);
            return of(MaterialsActions.createFoldersFaild({error}));
          })
        )
      )
    )
  },
  { functional: true}
)

export const deleteFolder = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteFolders),
      switchMap(
        ({ id }) => apiService.delete(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFoldersSuccess({ id })),
          catchError((error) => {
            console.log('Error ' + error.message);
            return of(MaterialsActions.deleteFoldersFaild({error}));
          })
        )
      )
    )
  },
  { functional: true }
)

export const loadMaterials = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(
        ({folder_id}) => apiService.get<Material[]>(`/material`).pipe(
          map((materialDta) => 
          MaterialsActions.loadMaterialsSuccess({
            materials: materialDta.filter((mat) => mat.folder_id === folder_id)
          })),
          catchError((error) => {
            console.log('Error ' + error.message);
            return of(MaterialsActions.loadMaterialsFaild({error}));
          })
        )
      )
    )
  },
  { functional: true }
)

export const createMaterial = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return action$.pipe(
      ofType(MaterialsActions.createMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(
        ([{ material }, params]) => {
          const folderId = Number(params['id']);
          const newMaterials: MaterialAdd = {
            title: material.title,
            material_link: material.material_link,
            folder_id: folderId
          };
          return apiService.post<Material, MaterialAdd>(`/material`, newMaterials).pipe(
            tap(() => console.log(newMaterials)),
            map((material) => MaterialsActions.createMaterialsSuccess({material})),
            catchError((error) => {
              console.log('Error ' + error.message);
              return of(MaterialsActions.loadMaterialsFaild({error}));
            })
          )
        }
      )
    )
  },
  { functional: true }
)

export const deleteMaterial = createEffect(
  () => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteMaterials),
      switchMap(
        ({material_id}) => apiService.delete(`/material/${material_id}`).pipe(
          map(() => MaterialsActions.deleteMaterialsSuccess({material_id})),
          catchError((error) => {
            console.log('Error ' + error.message);
            return of(MaterialsActions.loadMaterialsFaild({error}));
          })
        )
      )
    )
  },
  { functional: true }
)