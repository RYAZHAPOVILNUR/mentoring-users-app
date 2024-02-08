import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MATERIAL_URL } from '../../../../util/constant';
import { IFolder } from '../models/models';

export const loadFolders = createEffect(() => {
    const apiService = inject(ApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      switchMap(() =>
        apiService.get<IFolder[]>(MATERIAL_URL).pipe(
          map((folders: IFolder[]) => MaterialsActions.loadMaterialssSuccess({
            folders
          })),
          catchError(error => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialssFailure({ error }));
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
        apiService.post<IFolder, { title: string }>(MATERIAL_URL, { title })
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
      switchMap(({ folderId }) =>
        apiService.delete<{ folder_id: string }>(MATERIAL_URL + '/' + folderId)
          .pipe(
            map(() => MaterialsActions.deleteMaterialsSuccess()),
            catchError(error => {
              console.error('Error', error);
              return of(MaterialsActions.deleteMaterialsFolderFail(error));
            })
          )
      ));
  }, { functional: true }
);


