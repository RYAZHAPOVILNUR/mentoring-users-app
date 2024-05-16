import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { FoldersActions } from './folders.actions';
import { switchMap } from 'rxjs';
import { FolderInterface } from '../../interfaces/folder.interface';
import { map } from 'rxjs/operators';

export const loadFolders$ = createEffect(
  (actions$ = inject(Actions),
  apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        apiService.get<FolderInterface[]>('/folder').pipe(
          map((folders) => {
          return FoldersActions.loadFoldersSuccess({ folders })
          })
        )
      )
    )
  },
  { functional: true }
);

