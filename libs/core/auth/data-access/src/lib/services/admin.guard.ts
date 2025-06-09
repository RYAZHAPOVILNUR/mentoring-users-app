import { inject } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);


  return toObservable(authStore.signalIsAdmin).pipe(
    tap((isAdmin) => {
      if (isAdmin === null) {
        authStore.getUser();
      }
    }),
    filter((isAdmin) => isAdmin !== null),
    map((isAdmin) => !!isAdmin)
  );
};