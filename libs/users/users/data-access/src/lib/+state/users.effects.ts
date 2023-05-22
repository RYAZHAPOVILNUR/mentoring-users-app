import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() => of(UsersActions.loadUsersSuccess({ users: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(UsersActions.loadUsersFailure({ error }));
      })
    )
  );
}
