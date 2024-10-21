import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FoldersActions } from './folders.actions';
import { CreateFolderDTO, FoldersDTO } from '../../models/folders-dto.model';
import { FoldersEntity } from './folders.reducer';

export const loadFolders$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.loadFolders),
      switchMap(() =>
        api.get<FoldersDTO[]>('/folder').pipe(
          map(folders => {
            return FoldersActions.loadFoldersSuccess({ folders });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error })
            );
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
      switchMap(({ folderData }) =>
        api.post<FoldersEntity, CreateFolderDTO>('/folder', folderData).pipe(
          map((folderEntity) =>
            FoldersActions.addFolderSuccess({ folder: folderEntity })
          ),
          catchError((error => {
              console.error('Error', error);
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
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailure({ error }));
          }))
        )
      )
    );
  },
  { functional: true }
);
