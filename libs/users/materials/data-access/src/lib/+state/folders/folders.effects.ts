import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FoldersActions from './folders.actions';
import * as FoldersFeature from './folders.reducer';

@Injectable()
export class FoldersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() => of(FoldersActions.loadFoldersSuccess({ folders: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(FoldersActions.loadFoldersFailure({ error }));
      })
    )
  );
}
