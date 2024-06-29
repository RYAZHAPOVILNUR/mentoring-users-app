import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FoldersActions } from './folders.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../../models/folder.model';
import { CreateFolder } from '../../models/create-folder.model';
import { Store } from '@ngrx/store';

@Injectable()
export class FoldersEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  loadFolders = createEffect(() => {
    return this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      concatMap(() =>
        this.apiService.get<Folder[]>('/folder').pipe(
          map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailed({ error }));
          })
        )
      )
    );
  });

  addFolder = createEffect(() => {
    return this.actions$.pipe(
      ofType(FoldersActions.addFolder),
      concatMap(({folderData}) =>
        this.apiService.post<Folder, CreateFolder>('/folder', folderData).pipe(
          map((folderData) => FoldersActions.addFolderSuccess({ folderData })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailed({ error }));
          })
        )
      )
    );
  });

  deleteFolder = createEffect(() => {
    return this.actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      concatMap(({id}) => 
        this.apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({id})),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailed({ error }));
          })
        )
      )
    )
  });
}
