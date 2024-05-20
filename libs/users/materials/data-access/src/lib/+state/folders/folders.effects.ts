import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { foldersActions } from './foldersActions';
import { switchMap } from 'rxjs';
import { Folder } from '../../interfaces/folder.interface';
import { map } from 'rxjs/operators';

export const loadFolders$ = createEffect(
  (actions$ = inject(Actions),
  apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(foldersActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => {
          return foldersActions.loadFoldersSuccess({ folders })
          })
          // todo неявный возврат
          // todo обработать ошибку
        )
      )
    )
  },
  { functional: true }
);

