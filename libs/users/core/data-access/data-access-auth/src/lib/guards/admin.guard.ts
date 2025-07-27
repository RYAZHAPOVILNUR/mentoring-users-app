import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, map, tap } from 'rxjs';

import { AuthStore } from '../+state/auth-signal-store';

export const adminGuard: CanActivateFn = () => {
  const store = inject(AuthStore);

  return toObservable(store.isAdmin).pipe(
    tap((isAdmin) => {
      if (isAdmin === null) {
        store.getUser();
      }
    }),
    filter((isAdmin) => isAdmin !== null),
    map((isAdmin) => !!isAdmin),
  );
};
