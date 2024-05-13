import { ApiService } from '@users/core/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FoldersActions } from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Folder } from './folders.reducer';

@Injectable()
export class FoldersEffects {
  private readonly action$ = inject(Actions);
  private readonly apiService = inject(ApiService);

  public loadFolders = createEffect(() => {
    return this.action$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        this.apiService.get<Folder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            return of(FoldersActions.loadFoldersFailed({ error }));
          })
        )
      )
    );
  });

  public deleteFolder = createEffect(() => {
    return this.action$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) =>
        this.apiService.delete<Folder>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            return of(FoldersActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  });

  public createFolder = createEffect(() => {
    return this.action$.pipe(
      ofType(FoldersActions.createFolder),
      switchMap(({ title }) =>
        this.apiService.post<Folder, { title: string }>(`/folder`, { title }).pipe(
          map((folder) => FoldersActions.createFolderSuccess({ folder })),
          catchError((error) => {
            return of(FoldersActions.createFolderFailed(error));
          })
        )
      )
    );
  });
}
