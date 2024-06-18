import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { FolderAdd } from '../models/folder-add.model';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({ error })))
        )
      )
    );
  });

  addFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({ folder }) =>
        apiService.post<Folder, FolderAdd>('/folder', folder).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ folder })),
          catchError((error) => of(MaterialsActions.addFolderFailure({ error })))
        )
      )
    );
  });

  deleteFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteFolderFailure({ error })))
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
          map((data) => MaterialsActions.loadMaterialsSuccess({ data })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
