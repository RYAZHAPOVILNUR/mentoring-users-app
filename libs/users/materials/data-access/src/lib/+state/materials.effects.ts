import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { FoldersActions } from './materials.actions';
import { IFolder, IFolderCreate } from './../models/folders.model';
import { IMaterial, IMaterialCreate } from '../models/materials.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMaterialsOpenedFolder } from './materials.selectors';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder').pipe(
          map((folders) => {
            return FoldersActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addFolders),
      switchMap(({ foldersData }) =>
        apiService.post<IFolder, IFolderCreate>('/folder', foldersData).pipe(
          map((foldersEntity) =>
            FoldersActions.addFoldersSuccess({ foldersData: foldersEntity })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder$ = createEffect(
  () => {
    const actions = inject(Actions);
    const apiService = inject(ApiService);

    return actions.pipe(
      ofType(FoldersActions.deleteFolders),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFoldersSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFoldersFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const openFolder$ = createEffect(
  () => {
    const actions = inject(Actions);
    const apiService = inject(ApiService);
    const router = inject(Router);

    return actions.pipe(
      ofType(FoldersActions.openFolder),
      switchMap(({ folder }) =>
        apiService.get<IFolder>(`/folder/${folder.id}`).pipe(
          map((result) => FoldersActions.openFolderSuccess({ folder: result })),
          tap(({ folder }) => {
            router.navigate(['/materials', folder.id]);
          }),
          catchError((error) => of(FoldersActions.openFolderFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(FoldersActions.loadMaterials),
      withLatestFrom(store.select(selectMaterialsOpenedFolder)),
      switchMap(([_, openedFolder]) =>
        apiService.get<IMaterial[]>('/material').pipe(
          map((allMaterials) => {
            const filteredMaterials = allMaterials.filter(
              (material) => material.folder_id === openedFolder?.id
            );
            return FoldersActions.loadMaterialsSuccess({
              materials: filteredMaterials,
            });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteMaterial$ = createEffect(
  () => {
    const actions = inject(Actions);
    const apiService = inject(ApiService);

    return actions.pipe(
      ofType(FoldersActions.deleteMaterials),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => FoldersActions.deleteMaterialsSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addMaterials),
      switchMap(({ material }) =>
        apiService.post<IMaterial, IMaterialCreate>('/material', material).pipe(
          map((materialData) =>
            FoldersActions.addMaterialsSuccess({ material: materialData })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addMaterialsFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterialPDF$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addMaterialsPDF),
      switchMap(({ material }) =>
        apiService
          .post<IMaterial, IMaterialCreate>('/material_pdf_create', material)
          .pipe(
            map((materialData) =>
              FoldersActions.addMaterialsPDFSuccess({ material: materialData })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.addMaterialsPDFFailed({ error }));
            })
          )
      )
    );
  },
  { functional: true }
);
