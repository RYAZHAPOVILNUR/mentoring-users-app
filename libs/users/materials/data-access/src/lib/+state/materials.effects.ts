import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FoldersActions from './materials.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AddNewFolder, FolderInterface } from '../interfaces/folder.interface';
import { ApiService } from '@users/core/http';
import { AddNewMaterialReq, MaterialInterface } from '../interfaces/material.interface';


@Injectable()
export class FoldersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        this.apiService.get<FolderInterface[]>('/folder').pipe(
          map(folders => FoldersActions.loadFoldersSuccess({ folders })),
          catchError(error => of(FoldersActions.loadFoldersFailure({ error }))))
      )
    )
  );

  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ newFolderData }) => this.apiService.post<FolderInterface, AddNewFolder>('/folder', newFolderData).pipe(
          map((serverData) => FoldersActions.addFolderSuccess({
              newFolderData: {
                ...serverData
              }
            }
          ))
          ,
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailed({ error }));
          })
        )
      )
    ));

  deleteFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ folderId }) =>
        this.apiService.delete(`/folder/${folderId}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ folderId })),
          catchError(error => of(FoldersActions.deleteFolderFailure({ error })))
        )
      )
    )
  );

  loadMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadMaterialsFolders),
      switchMap(() =>
        this.apiService.get<MaterialInterface[]>('/material').pipe(
          map(materialFolders => FoldersActions.loadMaterialsFoldersSuccess({ materialFolders })),
          catchError(error => of(FoldersActions.loadMaterialsFoldersFailure({ error })))
        )
      )
    )
  );

  addMaterialsFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.addMaterialFolder),
      switchMap(({ newMaterialFolderData }) => this.apiService.post<MaterialInterface, AddNewMaterialReq>('/material', newMaterialFolderData).pipe(
          map((serverData) => FoldersActions.addMaterialFolderSuccess({
              newMaterialFolderData: {
                ...serverData
              }
            }
          ))
          ,
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addMaterialFolderFailed({ error }));
          })
        )
      )
    ));

  deleteMaterialFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.deleteMaterialFolder),
      switchMap(({ materialFolderId }) =>
        this.apiService.delete(`/material/${materialFolderId}`).pipe(
          map(() => FoldersActions.deleteMaterialFolderSuccess({ materialFolderId })),
          catchError(error => of(FoldersActions.deleteMaterialFolderFailure({ error })))
        )
      )
    )
  );


}
