import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as MaterialsActions from './materials.actions';
import { IAddFolder, IFolder, IMaterial } from './materials.reducer';

export class MaterialsEffects {
  loadFolders = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() => 
        apiService.get<IFolder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({ error })))
        )
      )
    )
  }, { functional: true });

  addFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          map((newFolder) => MaterialsActions.addFolderSuccess({ folder: newFolder })),
          catchError((error) => of(MaterialsActions.addFolderFailure({ error })))
        )
      )
    )
  }, { functional: true });

  deleteFolder = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteFolderFailure({ error })))
        )
      )
    )
  }, { functional: true });

  openFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.openFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
          map((folder) => MaterialsActions.openFolderSuccess({ folder })),
          catchError((error) => of(MaterialsActions.openFolderFailure({ error })))
        )
      })
    )
  }, { functional: true });

  loadMaterials = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return action$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) => {
            const filteredMaterials = materials.filter(
              (material) => material.folder_id === +params['id']
            );
            return MaterialsActions.loadMaterialsSuccess({ materials: filteredMaterials });
          }),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
        )
      )
    );
  }, { functional: true });

  addMaterial = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);

        const materialWithFolderId = {
          title: material.title,
          material_link: material.material_link,
          folder_id: folderId
        };

        return apiService.post<IMaterial, typeof materialWithFolderId>('/material', materialWithFolderId).pipe(
          map((newMaterial) => MaterialsActions.addMaterialSuccess({ material: newMaterial })),
          catchError((error) => of(MaterialsActions.addMaterialFailure({ error })))
        );
      })
    );
  }, { functional: true });

  deleteMaterial = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ materialId: id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          switchMap(() => [
            MaterialsActions.deleteMaterialSuccess({ materialId: id }),
            MaterialsActions.loadMaterials()
          ]),
          catchError((error) => of(MaterialsActions.deleteMaterialFailure({ error })))
        )
      )
    );
  }, { functional: true });
}