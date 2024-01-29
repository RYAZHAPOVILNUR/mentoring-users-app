import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateIFolder, IFolder } from '../models/folder.interface';
import * as UsersActions from '../../../../../users/data-access/src/lib/+state/users.actions';
import { CreateUserDTO, UsersDTO, usersDTOAdapter } from '@users/core/data-access';
import { error } from '@angular/compiler-cli/src/transformers/util';


export const loadFolders = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<IFolder[]>('/folder').pipe(
          map(
            (folders) => MaterialsActions.loadFoldersSuccess({
              folders
            })
          ),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(
        ({ newFolder }) => apiService.post<IFolder, CreateIFolder>('/folder', newFolder).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ newFolder: folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addFolderFailure({ error }));
          })
        )));
  }, { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(
        ({id}) => apiService.delete<IFolder>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({id})),
          catchError(error => {
            console.error('Error', error)
            return of(MaterialsActions.deleteFolderFailure({error}))
          })
        )
      )
    )
  }, {functional: true}
)
