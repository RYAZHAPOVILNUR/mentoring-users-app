import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IFolder } from '../../models/folder.interface';
import { of } from 'rxjs';
import { LoadingStatus } from '../../models/loading-status.enum';
import { FoldersActions } from './folders.actions';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      tap(() => console.log('Effect triggered')),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder').pipe(
          tap(() => console.log('API request sent')),
          tap((folders) => console.log('effect, folders', folders)),
          map(folders => {
            console.log('Folders from API:', folders);
            return FoldersActions.loadFoldersSuccess({ folders })}),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({
              status: LoadingStatus.Error,
              error
            }));
          })
        )
      )
    );
  },
  { functional: true }
);

