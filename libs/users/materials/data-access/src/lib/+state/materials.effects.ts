import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { CreateFolder } from '../models/create-folder.model';
import { Folder } from '../models/folder.model';

@Injectable()
export class MaterialsEffects {
  addFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

    // actions$.subscribe(console.log);
      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        concatMap(
          ({ folder }) =>
            apiService.post<Folder, CreateFolder>('/folder', folder).pipe(
              // tap(data => console.log('Data received from API:', data)),
              map((folders: Folder) =>
              MaterialsActions.addFolderSuccess({ folderData: folders })),
            catchError((error) => {
              return of(MaterialsActions.addFolderFailed({error: error.message}))
            })
          )
        )
      )
    }, {functional: true}
  );

  loadFolder = createEffect(
    () => {
      const actions$ = inject(Actions);
      const apiService = inject(ApiService);

      return actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        concatMap(
          () =>
            apiService.get<Folder[]>('/folder').pipe(
              map((folders: Folder[]) =>
                MaterialsActions.loadFoldersSuccess({ folderData: folders })),
              catchError((error) => {
                return of(MaterialsActions.loadFoldersFailed({error: error.message}))
              })
            )
        )
      )
    }, {functional: true}
  );


  loadMaterialss$ = createEffect(() => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => MaterialsActions.loadMaterialssSuccess({ data })),
          catchError((error) => of(MaterialsActions.loadMaterialssFailure({ error })))
        )
      )
    );
  });


}
