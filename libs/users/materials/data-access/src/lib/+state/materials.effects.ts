import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import {MaterialsActions} from './materials.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Folder } from '../models/folder.model';
import { FolderAdd } from '../models/folder-add.model';
import _default from 'chart.js/dist/plugins/plugin.title';
import id = _default.id;

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  }, {functional: true}
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({id}) => {
        return apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteFolderFailure({error}));
          })
        );
      })
    );
  }, {functional: true}
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      switchMap(({title}) => {
        return apiService.post<Folder, FolderAdd>('/folder', title).pipe(
          map((folder) => MaterialsActions.addFolderSuccess({ folder })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteFolderFailure({error}));
          })
        );
      })
    );
  }, {functional: true}
);
