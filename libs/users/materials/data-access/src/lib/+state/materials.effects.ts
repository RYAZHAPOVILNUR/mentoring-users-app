import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { IFolder, IAddFolder } from './materials.reducer';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
export class MaterialsEffects {
  loadFolders = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.loadFolders),
      tap(() => console.log('Loading folders...')),
      switchMap(() => 
        apiService.get<IFolder[]>('/folder').pipe(
          tap(response => console.log('API Response:', response)),
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => {
            console.error('Error loading folders:', error);
            return of(MaterialsActions.loadFoldersFailure({ error }))
          })
        )
      )
    )
  }, { functional: true });

  addFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      tap(action => console.log('1. Add Folder Action:', action)),
      switchMap(({ folder }) =>
        apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
          tap(response => console.log('2. API Response:', response)),
          map((newFolder) => MaterialsActions.addFolderSuccess({ folder: newFolder })),
          catchError((error) => {
            console.error('Error creating folder:', error);
            return of(MaterialsActions.addFolderFailure({ error }));
          })
        )
      )
    )
  }, { functional: true });

  deleteFolder = createEffect(() => {
    const action$ = inject(Actions);
    const apiService = inject(ApiService);

    return action$.pipe(
      ofType(MaterialsActions.deleteFolder),
      tap(action => console.log('1. Delete Folder Action:', action)),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          tap(() => console.log('2. Folder deleted successfully')),
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => {
            console.error('Error deleting folder:', error);
            return of(MaterialsActions.deleteFolderFailure({ error }))
          })
        )
      )
    )
  }, { functional: true });

  openFolder = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(MaterialsActions.openFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        return apiService.get<IFolder>(`/folder/${params['id']}`).pipe(
          tap(response => console.log('Opening folder response:', response)),
          map((folder) => MaterialsActions.openFolderSuccess({ folder })),
          catchError((error) => {
            console.error('Error opening folder:', error);
            return of(MaterialsActions.openFolderFailure({ error }))
          })
        )
      })
    )
  }, { functional: true });
}