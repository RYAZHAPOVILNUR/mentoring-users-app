import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FoldersActions from './folders.actions';
import * as FoldersFeature from './folders.reducer';
import { ApiService } from '@users/core/http';
import {FoldersEntity} from 'libs/users/materials/data-access/src/lib/folders-state/folders.models';
import { map } from 'rxjs/operators';




  export const initFolders = createEffect(() =>{
    const httpService = inject(ApiService)
    const actions$ = inject(Actions)
    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        httpService.get<FoldersEntity[]>('/folder').pipe(
          map((data) => FoldersActions.loadFoldersSuccess({ folders: data })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFoldersFailure({ error }));
          })
        )
      )
    );
  }, { functional: true });

