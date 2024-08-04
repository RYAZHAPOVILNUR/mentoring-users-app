import { inject,Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MaterialsActions from './materials.actions';
import { ApiService } from '@users/core/http';
import { IFolder } from '../models/folder.model';import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAddFolder } from '../models/folder-add.model';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() => 
          apiService.get<IFolder[]>('/folder').pipe(
            map((folders) => 
               MaterialsActions.loadFoldersSuccess({ folders })
            ),
            catchError((error) => {console.error('Error', error);
            return of(MaterialsActions.loadFoldersFailure({ error }))
            })
            )
        )
      )
    }, {functional: true}
  );

  deleteFolder = createEffect(
    () => {
      const action$ = inject(Actions);
      const apiService = inject(ApiService);

      return action$.pipe(
        ofType(MaterialsActions.deleteFolder),
        switchMap(({ id }) =>
          apiService.delete<void>(`/folder/${id}`).pipe(
            map(() =>
              MaterialsActions.deleteFolderSuccess({ id })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.deleteFolderFailure({ error }))
            })
          )
        )
      )
    }, {functional: true}
  )

  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folder }) =>
          apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
            map((newFolder) =>
              MaterialsActions.addFolderSuccess({ folder: newFolder })
            ),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }))
            })
          )
      ))
    }, {functional: true}
  )

  openFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);
      const store = inject(Store);
      return actions$.pipe(
        ofType(MaterialsActions.openFolder),
        withLatestFrom(store.select(selectRouteParams)),
        switchMap(([, params]) => {
          return apiService.get<IFolder>(`/folder/${params['id']}`)
          .pipe(
            map((folder) => MaterialsActions.openFolderSuccess({ folder })),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.openFolderFailure({ error }))
            })
          )
        })
      )
    }, {functional: true}
  )
}