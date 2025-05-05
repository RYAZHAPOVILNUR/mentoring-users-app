import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { IAddFolder } from "../../models/folders/folders-add.model";
// import { FoldersActions } from './folders.actions';
import { IFolder } from '../../models/folders/folders.models';
import * as FoldersActions from './folders.actions';



export const loadFolders = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
  
      return actions$.pipe(
        ofType(FoldersActions.initFolders),
        switchMap(() =>
          apiService.get<IFolder[]>('/folder').pipe(
            map((folders) => FoldersActions.loadFoldersSuccess({ folders })),
            catchError((error) => {
              return of(FoldersActions.loadFoldersFailed({ error }));
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
        ofType(FoldersActions.addFolder),
        switchMap(({ folder }) =>
          apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
            map((response) => FoldersActions.addFolderSuccess({ folder: response })),
            catchError((error) => {
              return of(FoldersActions.addFolderFailed({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
  

  export const loadFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      const store = inject(Store);
  
      return actions$.pipe(
        ofType(FoldersActions.loadFolder),
        withLatestFrom(store.select(selectRouteParams)),
        switchMap(([, params]) => {
          return apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
            map((folder) => FoldersActions.loadFolderSuccess({ folder })),
            catchError((error) => {
              return of(FoldersActions.loadFolderFailed({ error }));
            })
          );
        })
      );
    },
    { functional: true }
  );