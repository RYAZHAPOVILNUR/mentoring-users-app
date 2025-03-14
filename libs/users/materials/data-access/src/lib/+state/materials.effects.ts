import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FoldersActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddNewFolder, Folder } from '../interfaces/folder.interface';
import { AddNewMaterial, Material } from '../interfaces/material.interface';

@Injectable()
export class FoldersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        this.apiService.get<Folder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(FoldersActions.addFolderFailure({ error })))
        )
      )
    )
  );
  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ NewFolderData }) =>
        this.apiService.post<Folder, AddNewFolder>('/folder', NewFolderData).pipe(
          map((serverData) =>
            FoldersActions.addFolderSuccess({
              NewFolderData: {
                ...serverData,
              },
            })
          ),
          catchError((error) => of(FoldersActions.addFolderFailure({ error })))
        )
      )
    )
  );
  deleteFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ FolderId }) =>
        this.apiService.delete(`/folder/${FolderId}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ FolderId })),
          catchError((error) => of(FoldersActions.deleteFolderFailure({ error })))
        )
      )
    )
  );
  loadMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadMaterials),
      switchMap(() =>
        this.apiService.get<Material[]>('/material').pipe(
          map((materials) => FoldersActions.loadMaterialsSuccess({ materials })),
          catchError((error) => of(FoldersActions.loadMaterialsFailure({ error })))
        )
      )
    )
  );
  addMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.addMaterial),
      switchMap(({ NewMaterialData }) =>
        this.apiService.post<Material, AddNewMaterial>('/material', NewMaterialData).pipe(
          map((serverData) =>
            FoldersActions.addMaterialSuccess({
              NewMaterialData: {
                ...serverData,
              },
            })
          )
        )
      )
    )
  );
  deletematerial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.deleteMaterial),
      switchMap(({ MaterialId }) =>
        this.apiService.delete(`/material/${MaterialId}`).pipe(
          map(() => FoldersActions.deleteMaterialSuccess({ MaterialId })),
          catchError((error) => of(FoldersActions.deleteMaterialFailure({ error })))
        )
      )
    )
  );
}
