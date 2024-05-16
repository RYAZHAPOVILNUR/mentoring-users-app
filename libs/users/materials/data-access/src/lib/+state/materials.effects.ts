import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { FolderDTO } from '@users/core/data-access';


export const MaterialsEffects = createEffect(() => {
  const actions$ = inject(Actions);
  const apiService = inject(ApiService)

  return actions$.pipe(
    ofType(MaterialsActions.initFolders),
    switchMap(
      () =>
       apiService.get<FolderDTO[]>('/folder').pipe(
        map(
          (folders) => MaterialsActions.loadFoldersSuccess({ folders })),
        catchError((error) => {console.log('Error', error)
        return of(MaterialsActions.loadFoldersFailure({ error }))}
          )
      )
    )
  );
}, { functional: true })
