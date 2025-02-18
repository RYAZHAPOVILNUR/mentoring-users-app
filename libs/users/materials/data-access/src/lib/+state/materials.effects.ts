import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, exhaustMap, tap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { AddFolderDTO, AddMaterialDTO, FolderDTO, MaterialDTO } from '../models/interfaces';

@Injectable()
export class MaterialsEffects {
  apiService = inject(ApiService)
  actions$ = inject(Actions)

  initFolders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.initFolders, MaterialsActions.initFiles),
      exhaustMap(_ =>
        this.apiService.get<FolderDTO[]>('/folder').pipe(
          map((folders: FolderDTO[]) => MaterialsActions.initFoldersSuccess({ folders })),
          catchError((error) => of(MaterialsActions.initFoldersFailure({ error })))
        )
      )
    );
  });

  initFiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.initFiles),
      exhaustMap(_ =>
        this.apiService.get<MaterialDTO[]>(`/material`).pipe(
          map((files: MaterialDTO[]) => MaterialsActions.initFilesSuccess({ files })),
          catchError((error) => of(MaterialsActions.initFilesFailure({ error })))
        )
      )
    );
  });

  loadFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadFolder),
      exhaustMap(({ folder }: { folder: AddFolderDTO }) =>
        this.apiService.post<FolderDTO, AddFolderDTO>('/folder', folder).pipe(
          map((folder: FolderDTO) => MaterialsActions.loadFolderSuccess({ folder }))
        )
      )
    );
  });

  loadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.loadFile),
      exhaustMap(({ file }: { file: AddMaterialDTO }) =>
        this.apiService.post<MaterialDTO, AddMaterialDTO>(`/material`, file).pipe(
          map((file: MaterialDTO) => MaterialsActions.loadFileSuccess({ file }))
        )
      )
    );
  });

  deleteFolder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      exhaustMap(({ folder, openFn }: { folder: FolderDTO, openFn: () => void }) =>
        this.apiService.delete<null>(`/folder/${folder.id}`).pipe(
          tap(_ => openFn()),
          map(() => MaterialsActions.deleteFolderSuccess({ folder }))
        )
      )
    );
  });

  deleteFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsActions.deleteFile),
      exhaustMap(({ file }: { file: MaterialDTO }) =>
        this.apiService.delete<null>(`/material/${file.id}`).pipe(
          map(_ => MaterialsActions.deleteFileSuccess({ file }))
        )
      )
    );
  });
}
