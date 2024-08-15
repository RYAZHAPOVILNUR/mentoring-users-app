import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
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

      return actions$.pipe(
        ofType(MaterialsActions.addFolder),
        concatMap(
          ({folderData}) =>
            apiService.post<Folder[], CreateFolder>('/folder', folderData).pipe(
            map((folderData) =>
              MaterialsActions.addFolderSuccess({folderData})),
            catchError((error) => {
              return of(MaterialsActions.addFolderFailed({error: error.message}))
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
