import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IFolder } from '../../models/folder.interface';
import { of } from 'rxjs';
import { LoadingStatus } from '../../models/loading-status.enum';
import { FoldersActions } from './folders.actions';
import { error } from 'ng-packagr/lib/utils/log';


export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      tap(() => console.log('Effect triggered')),
      switchMap(() =>
        api.get<IFolder[]>('/folder').pipe(
          tap(() => console.log('API request sent')),
          tap((folders) => console.log('effect, folders', folders)),
          map(folders => {
            console.log('Folders from API:', folders);
            return FoldersActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({
              status: LoadingStatus.Error, error
            }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      switchMap(({ folder }) =>
        api.post('/folder', folder).pipe(
          map(folderEntity => {
              return FoldersActions.addFolderSuccess({ folder: folder });
            }
          ),
          catchError((error => {
              return of(FoldersActions.addFolderFailure({ error }));
            })
          )
        )));
  }, { functional: true }
);

export const deleteFolder$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ folderId }) =>
        api.delete(`/folder/${folderId}`).pipe(
          map(() => {
            return FoldersActions.deleteFolderSuccess({ folderId });
          }),
          catchError((error => {
            return of(FoldersActions.deleteFolderFailure({
              error
            }));
          }))
        )
      )
    );
  },
  { functional: true }
);
