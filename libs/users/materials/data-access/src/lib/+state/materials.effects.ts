import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FoldersActions from './materials.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AddNewFolder, FolderInterface } from '../interfaces/folder.interface';
import { ApiService } from '@users/core/http';


@Injectable()
export class FoldersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        this.apiService.get<FolderInterface[]>('/folder').pipe(
          map(folders => FoldersActions.loadFoldersSuccess({ folders })),
          catchError(error => of(FoldersActions.loadFoldersFailure({ error }))))
      )
    )
  );

  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ newFolderData }) => this.apiService.post<FolderInterface, AddNewFolder>('/folder', newFolderData).pipe(
          map((serverData) => FoldersActions.addFolderSuccess({
              newFolderData: {
                ...serverData
              }
            }
          ))
          ,
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailed({ error }));
          })
        )
      )
    ));

  deleteFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ folderId }) =>
        this.apiService.delete(`/folder/${folderId}`).pipe(
          map(() => FoldersActions.deleteFolderSuccess({ folderId })),
          catchError(error => of(FoldersActions.deleteFolderFailure({ error })))
        )
      )
    )
  );
}
