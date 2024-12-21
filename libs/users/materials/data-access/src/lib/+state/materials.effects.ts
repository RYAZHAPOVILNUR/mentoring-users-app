import {  inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { IMaterial } from '../models/material.model';
import { IFolder } from '../models/folder.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';


export  const MaterialsEffects = createEffect(
    () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([_, params]) =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({
            materials: materials.filter(
              (material) => material.folder_id === +params['id'])
          })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
        )
      ),
    );
  },
  { functional: true }
);


// export const addMaterials = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(ApiService);
//
//     return actions$.pipe(
//       ofType(MaterialsActions.addMaterials),
//
//     )
//
//   },
//   {functional: true}
// )

export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialsFolders),
      switchMap(() =>
      apiService.get<IFolder[]>('/folder').pipe(
        map((folders) => MaterialsActions.loadMaterialsFoldersSuccess({ folders })),
        catchError((error) => {
          console.log("Error", error);
          return of(MaterialsActions.loadMaterialsFoldersFailure({error}))
        })
      )
    ))
  }, {functional: true}
)

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterialsFolder),
      switchMap((title ) =>
        apiService
          .post<IFolder, {title: string}>('/folder', title)
          .pipe(map((folder) => MaterialsActions.addMaterialsFolderSuccess({ folder })))
      )
    );
  },
  {functional: true}
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterialsFolder),
      switchMap(({ folder_id }) =>
        apiService.delete(`/folder/${folder_id}`).pipe(
          tap((data) => console.log(data)),
          map(() => MaterialsActions.deleteMaterialsFolderSuccess({folder_id: folder_id}))
        )
      )
    );
  },
  {functional: true}
)
