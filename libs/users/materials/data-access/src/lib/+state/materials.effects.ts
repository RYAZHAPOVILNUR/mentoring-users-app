import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { FOLDER_URL, MATERIAL_URL } from '../../../../util/constant';
import { IFolder, IMaterial, IMaterialPost } from '../models/models';

export const loadFolders = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialsFolders),
      switchMap(() =>
        apiService.get<IFolder[]>(FOLDER_URL).pipe(
          map((folders: IFolder[]) => MaterialsActions.loadMaterialsFoldersSuccess({
            folders
          })),
          catchError(error => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFoldersFailure({ error }));
          })
        )
      ));
  }, { functional: true }
);

export const addFolder = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterialsFolder),
      switchMap(({ title }) =>
        apiService.post<IFolder, { title: string }>(FOLDER_URL, { title })
          .pipe(
            map((folder: IFolder) => MaterialsActions.addMaterialsFolderSuccess({ folder })),
            catchError(error => {
              console.error('Error', error);
              return of(MaterialsActions.addMaterialsFolderFail(error));
            })
          )
      ));
  }, { functional: true }
);

export const deleteFolder = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterialsFolder),
      switchMap(({ folder: { deleteId } }) =>
        apiService.delete(FOLDER_URL + '/' + deleteId)
          .pipe(
            map(() => {
              return MaterialsActions.deleteMaterialsFolderSuccess();
            }),
            catchError(error => {
              console.error('Error', error);
              return of(MaterialsActions.deleteMaterialsFolderFail(error));
            })
          )
      ));
  }, { functional: true }
);

export const loadMaterials = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      switchMap(() =>
        apiService.get<IMaterial[]>(MATERIAL_URL).pipe(
          map((materials: IMaterial[]) => MaterialsActions.loadMaterialssSuccess({
            materials
          })),
          catchError(error => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialssFailure({ error }));
          })
        )
      ));
  }, { functional: true }
);

export const addMaterial = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ material }) => {
        return apiService.post<IMaterial, IMaterialPost>(MATERIAL_URL, material)
          .pipe(
            map(() => MaterialsActions.loadMaterialss()),
            catchError(error => {
              console.error('Error', error);
              return of(MaterialsActions.addMaterialFail(error));
            })
          );
      }));
  }, { functional: true }
);


export const deleteMaterial = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ deleteItem: { deleteId } }) => {
          return apiService.delete<{ deleteId: number }>(MATERIAL_URL + '/' + deleteId)
            .pipe(
              map(() => MaterialsActions.loadMaterialss()),
              catchError(error => {
                console.error('Error', error);
                return of(MaterialsActions.deleteMaterialFail(error));
              })
            );
        }
      ));
  }, { functional: true }
);
