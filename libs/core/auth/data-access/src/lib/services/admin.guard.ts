import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';

export const adminGuard: CanActivateFn = () => {
  const authSignalStore = inject(AuthStore);

  return toObservable(authSignalStore.signalIsAdmin).pipe(
    tap((isAdmin) => {
      if (isAdmin === null) {
        authSignalStore.getUser();
      }
    }),
    filter((isAdmin) => isAdmin !== null),
    map((isAdmin) => !!isAdmin),
  );
};
