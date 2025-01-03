import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { IAddMaterial, IMaterial } from '../models/material.model';
import { IFolder } from '../models/folder.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

export const MaterialsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([_, params]) =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({
              materials: materials.filter((material) => material.folderId === +params['id']),
            })
          ),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
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
      ofType(MaterialsActions.addMaterials),
      tap((data) => console.log(data)),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([{ materials }, params]) => {
        const folderId = Number(params['id']);

        const editedMaterial = {
          ...materials,
          folderId: folderId,
        };
        return apiService
          .post<IMaterial, IAddMaterial>('/material', editedMaterial)
          .pipe(map((newMaterial) => MaterialsActions.addMaterialsSuccess({ materials: newMaterial })));
      })
    );
  },
  { functional: true }
);

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
            console.log('Error', error);
            return of(MaterialsActions.loadMaterialsFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterialsFolder),
      switchMap((title) =>
        apiService
          .post<IFolder, { title: string }>('/folder', title)
          .pipe(map((folder) => MaterialsActions.addMaterialsFolderSuccess({ folder })))
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
      ofType(MaterialsActions.deleteMaterialsFolder),
      switchMap(({ folderId }) =>
        apiService
          .delete(`/folder/${folderId}`)
          .pipe(map(() => MaterialsActions.deleteMaterialsFolderSuccess({ folderId: folderId })))
      )
    );
  },
  { functional: true }
);

export const deleteMaterialById = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete(`/material/${id}`).pipe(map(() => MaterialsActions.deleteMaterialsSuccess({ id })))
      )
    );
  },
  { functional: true }
);
