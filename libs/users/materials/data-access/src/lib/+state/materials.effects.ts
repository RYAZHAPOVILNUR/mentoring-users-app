import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { IMaterial } from '../models/imaterial';
import { FolderService } from '../services/folder-service/folder-service.service';
import { IFolder, IFolderCreate } from '../models/ifolder';

@Injectable()
export class MaterialsEffects {
  actions$ = inject(Actions);
  httpFolderService = inject(FolderService);

  loadFolders$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FoldersActions.loadFolders),
        switchMap(() =>
          this.httpFolderService.getFolders().pipe(
            map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
            catchError((error) =>
              of(FoldersActions.loadFoldersFailure({ error }))
            )
          )
        )
      );
    },
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

  deleteFolder$ = createEffect(() => {
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
  });

  loadMaterials$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) =>
            MaterialsActions.loadMaterialsSuccess({ materials: data })
          ),
          catchError((error) =>
            of(MaterialsActions.loadMaterialsFailure({ error }))
          )
        )
      )
    );
  });
}
