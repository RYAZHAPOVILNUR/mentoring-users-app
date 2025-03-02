import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../+state/auth.selectors';
import { filter, map, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { authActions } from '../+state/auth.actions';


export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);

  return store.select(selectIsAdmin).pipe(
    tap(isAdmin => {
      if (isAdmin === null) {
        store.dispatch(authActions.getUser());
      }
    }),
    filter(isAdmin => isAdmin !== null),
    map(isAdmin => !!isAdmin)
  );
};
