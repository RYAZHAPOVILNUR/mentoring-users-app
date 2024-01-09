import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  debounceTime,
} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { IMaterial, IMaterialPost } from '../models/imaterial';
import { FolderService } from '../services/folder-service/folder-service.service';
import { IFolder, IFolderCreate, IFolderId } from '../models/ifolder';
import { MaterialService } from '../services/material-service/material-service.service';
import { fetch } from '@nx/angular';

@Injectable()
export class MaterialsEffects {
  actions$ = inject(Actions);
  httpFolderService = inject(FolderService);
  httpMaterialService = inject(MaterialService);

  //Folders (using fetch Nx operator)
  // loadFolders$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(FoldersActions.loadFolders),
  //       fetch({
  //         run: () => {
  //           return this.httpFolderService
  //             .getFolders()
  //             .pipe(
  //               map((folders) => FoldersActions.loadFoldersSuccess({ folders }))
  //             );
  //         },
  //         onError: (action, error) =>
  //           FoldersActions.loadFoldersFailure({ error }),
  //       })
  //     );
  //   },
  //   { functional: true }
  // );

  loadFolders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FoldersActions.loadFolders),
        debounceTime(300), // предотвратить множественные запросы
        switchMap(() =>
          this.httpFolderService.getFolders().pipe(
            map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
            catchError((error) =>
              of(FoldersActions.loadFoldersFailure({ error }))
            )
          )
        )
      ),
    { functional: true }
  );

  createFolder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.createFolder),
        switchMap(({ folder }) =>
          this.httpFolderService
            .createFolder<IFolder, IFolderCreate>('/folder', folder)
            .pipe(
              map((newFolder) =>
                FoldersActions.createFolderSuccess({ folder: newFolder })
              ),
              catchError((error) =>
                of(FoldersActions.createFolderFailure({ error }))
              )
            )
        )
      );
    },
    { functional: true }
  );

  deleteFolder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.deleteFolder),
        switchMap(({ id }) =>
          this.httpFolderService.deleteFolder(Number(id)).pipe(
            map(() => FoldersActions.deleteFolderSuccess({ id })),
            catchError((error) =>
              of(FoldersActions.deleteFolderFailure({ error }))
            )
          )
        )
      );
    },
    { functional: true }
  );

  //Materials
  //Load materials
  loadMaterials$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.loadMaterials),
        switchMap(({ id }) =>
          this.httpMaterialService.getFolderMaterials(Number(id)).pipe(
            map((materials) =>
              MaterialsActions.loadMaterialsSuccess({ materials })
            ),
            catchError((error) =>
              of(MaterialsActions.loadMaterialsFailure({ error }))
            )
          )
        )
      );
    },
    { functional: true }
  );

  //Create material
  createMaterial$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.createMaterial),
        switchMap(({ material }) =>
          this.httpMaterialService
            .postMaterial<IMaterial, IMaterialPost>(material)
            .pipe(
              map((newMaterial) =>
                MaterialsActions.createMaterialSuccess({
                  material: newMaterial,
                })
              ),
              catchError((error) =>
                of(MaterialsActions.createMaterialFailure({ error }))
              )
            )
        )
      );
    },
    { functional: true }
  );

  //Delete material
  deleteMaterial$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.deleteMaterial),
        switchMap(({ id }) =>
          this.httpMaterialService.deleteMaterial(Number(id)).pipe(
            map(() => MaterialsActions.deleteMaterialSuccess({ id })),
            catchError((error) =>
              of(MaterialsActions.deleteMaterialFailure({ error }))
            )
          )
        )
      );
    },
    { functional: true }
  );
}
