import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import { addFolder, initFolders } from './folders.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { FoldersDTO } from '@users/core/data-access';
import * as FolderActions from './folders.actions';
import { CreateFolderDTO } from '../../../../../../../core/data-access/src';
import { foldersAdapter } from './folders.reducer';

export const folderEffect = createEffect(
  () => {
  const actions$ = inject(Actions);
  const store = inject(Store);
  const apiService = inject(ApiService);

  return actions$.pipe(
    ofType(initFolders),
    switchMap(() =>
      apiService.get<FoldersDTO[]>('/folder').pipe(
        map((folders) => FolderActions.loadFoldersSuccess({ folders })),
        catchError((err) => {
          console.log(err.message)
          return of(FolderActions.loadFoldersFailure(err))
        })
      )
    )
  )
}, {functional: true})

export const addFolderEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(addFolder),
      switchMap(({ folder }) =>
        apiService.post<FoldersDTO,CreateFolderDTO>('/folder', folder).pipe(
          map((folder) => {
            return folder
          }),
          map((folder) => FolderActions.addFolderSuccess({ folder })),
          catchError((err) => {
            console.log(err)
            return of(FolderActions.loadFoldersFailure(err))
          })
        )
      )
    )
  }, {functional: true}
)
