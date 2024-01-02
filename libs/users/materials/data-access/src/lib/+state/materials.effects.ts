import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { IMaterial } from '../models/imaterial';
import { FolderService } from '../services/folder-service/folder-service.service';

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

  // loadFolders$ = createEffect(() => {
  //   const httpFolderService = inject(FolderService);
  //   return this.actions$.pipe(
  //     ofType(FoldersActions.loadFolders),
  //     switchMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map((data) => FoldersActions.loadFoldersSuccess({ folders: data })),
  //         catchError((error) =>
  //           of(FoldersActions.loadFoldersFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

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
