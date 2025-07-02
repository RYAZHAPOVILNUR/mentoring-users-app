import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';

import { authActions } from '../+state/auth.actions';
import { selectIsAdmin } from '../+state/auth.selectors';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);

  return store.select(selectIsAdmin).pipe(
    tap((isAdmin) => {
      if (isAdmin === null) {
        store.dispatch(authActions.getUser());
      }
    }),
    filter((isAdmin) => isAdmin !== null),
    map((isAdmin) => !!isAdmin),
  );
};
