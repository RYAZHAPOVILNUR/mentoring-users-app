import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';

export const initMaterials = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.initMaterials),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          tap((folders) => console.log('effect, folders', folders)),
          map((folders) => materialsActions.initMaterialsSuccess({ folders })),

          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.initMaterialsFailure());
          })
        )
      )
    );
  },
  { functional: true }
);

export const addNewFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.addFolder),
      switchMap(({ newFolderData, onSuccessSnackbar }) =>
        apiService.post<Folder, AddFolder>('/folder', newFolderData).pipe(
          map((newFolder) => ({ newFolder, onSuccessSnackbar })),
          tap(({onSuccessSnackbar}) => onSuccessSnackbar()),
          map(({newFolder}) => materialsActions.addFolderSuccess({ newFolder }))
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => materialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.deleteFolderFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
