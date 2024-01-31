import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialsDTO, CreateMaterialDTO } from '../models/materials-dto.model';
import { CreateFolderDTO, FolderDTO } from '../models/folders-dto.models';
import { FolderEntity } from '../models/folders.entity';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  private actions$ = inject(Actions);
  apiService = inject(ApiService);
  store = inject(Store);

  loadFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() => this.apiService.get<FolderDTO[]>('/folder').pipe(
        map((folders) =>  MaterialsActions.loadFoldersSuccess({folders})),
        catchError((error) => of(MaterialsActions.loadFoldersFailure({error})))
      ))
    );
  });

  addFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addFolders),
      switchMap(({folder}) => { 
          return this.apiService.post<FolderDTO, CreateFolderDTO>('/folder', folder).pipe(
            map((folderDTO)=> {
              return MaterialsActions.addFoldersSuccess({newFolder: folderDTO});
            }),
            catchError((error)=> {
              return of(MaterialsActions.addFoldersFailure({error: error}));
            })
        )}
    ))
  });

  deleteFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({id}) => this.apiService.delete<FolderEntity>(`/folder/${id}`).pipe(
        map(() => MaterialsActions.deleteFolderSuccess({id})),
        catchError((error) =>{
          return of(MaterialsActions.deleteFolderFailure({error}))
        })
      ))
    );
  });



//Materials
  loadMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      switchMap(() => this.apiService.get<MaterialsDTO[]>('/material').pipe(
        map((materials) => MaterialsActions.loadMaterialssSuccess({materials})),
        catchError((error) => {
          return of(MaterialsActions.loadMaterialssFailure({error}))
        })
      ))
    );
  });

  addMaterialss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.addMaterialss),
      withLatestFrom(this.store.select(selectRouteParams)),
      switchMap(([{material}, params]) => { 
        return this.apiService.post<MaterialsDTO, CreateMaterialDTO>('/material', material).pipe(
          map((materialDTO)=> {
            return MaterialsActions.addMaterialssSuccess({newMaterial: materialDTO});
          }),
          catchError((error)=> {
            return of(MaterialsActions.addMaterialssFailure({error: error}));
          })
        )
      }
    ))
  });

  deleteMaterials$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteMaterialss),
      switchMap(({id}) => this.apiService.delete<FolderEntity>(`/material/${id}`).pipe(
        map(() => MaterialsActions.deleteMaterialssSuccess({id})),
        catchError((error) =>{
          return of(MaterialsActions.deleteMaterialssFailure({error}))
        })
      ))
    );
  });
}
