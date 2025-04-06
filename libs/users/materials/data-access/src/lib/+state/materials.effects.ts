import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder, newFolder } from '../models/folders.interface';
import { Store } from '@ngrx/store';
import { Material } from '../models/materials.interface';

@Injectable()
export class MaterialsEffects {

  private actions$ = inject(Actions);
  private store = inject(Store);
  private apiService = inject(ApiService);

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      mergeMap(() => this.apiService.get<Folder[]>('/folder').pipe(
        map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
        catchError((error) => {
          console.log('Error: ', error);
          return of(MaterialsActions.loadFoldersFailure({ error }));
        })
      )
      )
    )
  );

  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.createFolder),
      switchMap((action) => 
        this.apiService.post<Folder, newFolder>('/folder', action.folder).pipe(
          map((createdFolder) => 
            MaterialsActions.createFolderSuccess({ folder: createdFolder })
          ),
          catchError((error) => 
            of(MaterialsActions.createFolderFailure({ error }))
          )
        )
      )
    )
  );

  deleteFolder = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ folderId }) => 
        this.apiService.delete<void>(`/folder/${folderId}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ folderId })),
          catchError((error) => 
            of(MaterialsActions.deleteFolderFailure({ error }))
          )
        )
      )
    )
  );

  openFolder = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.openFolder),
      map(({ folderId }) => MaterialsActions.loadMaterials({ folderId }))
    )
  );
  
  loadMaterials = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(({ folderId }) =>
        this.apiService.get<Material[]>(`/material?folderId=${folderId}`).pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) =>
            of(MaterialsActions.loadMaterialsFailure({ error }))
          )
        )
      )
    )
  );
}
