import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { MaterialsFoldersAction } from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Folder, FolderCreate, FolderErrors } from '../../models/folders.interface';
@Injectable()
export class FoldersEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);

  foldersLoadEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsFoldersAction.loadFolders),
      switchMap(() =>
        this.apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsFoldersAction.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsFoldersAction.loadFoldersFailure({ error }));
          })
        )
      )
    );
  });

  folderDeleteEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsFoldersAction.deleteFolder),
      switchMap(({ id }) =>
        this.apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsFoldersAction.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsFoldersAction.deleteFolderFailure({ error }));
          })
        )
      )
    );
  });

  FolderCreateEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialsFoldersAction.createFolder),
      switchMap(({ title }) => {
        return this.apiService.post<Folder, FolderCreate>(`/folder`, title).pipe(
          map((folder: Folder) => MaterialsFoldersAction.createFolderSuccess({ folder })),
          catchError((error: FolderErrors) => {
            console.error('Error', error);
            return of(MaterialsFoldersAction.createFolderFailure({ error }));
          })
        );
      })
    );
  });
}
