import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateFolder } from '../models/create-folder.model';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

@Injectable()
export class MaterialsEffects {
  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

    // actions$.subscribe(console.log);
      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        concatMap(
          ({ folder }) =>
            apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
              // tap(data => console.log('Data received from API:', data)),
              map((folders: Folder) =>
              MaterialsActions.addFolderSuccess({ folderData: folders })),
            catchError((error) => {
              return of(MaterialsActions.addFolderFailed({error: error.message}))
            })
          )
        )
      )
    }, {functional: true}
  );

  loadFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        concatMap(
          () =>
            apiService.get<Folder[]>('/folder').pipe(

              map((folders: Folder[]) =>
                MaterialsActions.loadFoldersSuccess({ folderData: folders })),
              catchError((error) => {
                return of(MaterialsActions.loadFoldersFailed({error: error.message}))
              })
            )
        )
      )
    }, {functional: true}
  );

  deleteFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.deleteFolder),
        // delay(1500),
        switchMap(({ id }) =>
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() => MaterialsActions.deleteFolderSuccess({ id })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteFolderFailed({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );


// Materials
  loadMaterial = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      // actions$.subscribe(console.log);

      return actions$.pipe(
        ofType(MaterialsActions.loadMaterials),
        concatMap(
          () =>
            apiService.get<Material[]>('/material').pipe(
              // tap(data => console.log('Data received from API:', data)),
              map((materials) =>
                MaterialsActions.loadMaterialsSuccess({ materials })),
              catchError((error) => {
                return of(MaterialsActions.loadMaterialsFailure({error: error.message}))
              })
            )
        )
      )
    }, {functional: true}
  );



}
