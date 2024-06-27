import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { FolderAdd } from '../models/folder-add.model';
import { Material } from '../models/material.model';
import { MaterialAdd } from '../models/material-add.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({ error })))
        )
      )
    );
  });

  loadFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        const id = Number(params['id']);

        return apiService.get<Folder>(`/folder/${id}`).pipe(
          map((folder) => MaterialsActions.loadFolderSuccess({ folder })),
          catchError((error) => of(MaterialsActions.loadFolderFailure({ error })))
        );
      })
    );
  });

  addFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, FolderAdd>('/folder', folder).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ folder })),
          catchError((error) => of(MaterialsActions.addFolderFailure({ error })))
        )
      )
    );
  });

  deleteFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteFolderFailure({ error })))
        )
      )
    );
  });

  loadMaterials$ = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({ error })))
        )
      )
    );
  });

  addMaterial = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ material }, params]) => {
        const folderId = Number(params['id']);

        const materialWithFolderId: MaterialAdd = {
          ...material,
          folder_id: folderId,
        };

        return apiService.post<Material, MaterialAdd>('/material', materialWithFolderId).pipe(
          map((material) => MaterialsActions.addMaterialSuccess({ material })),
          catchError((error) => of(MaterialsActions.addMaterialFailure({ error })))
        );
      })
    );
  });

  deleteMaterial = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteMaterialFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
