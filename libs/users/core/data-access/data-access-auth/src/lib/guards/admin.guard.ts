import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs';

import { AuthStore } from '../+state/auth-signal-store';
import { authActions } from '../+state/auth.actions';
import { selectIsAdmin } from '../+state/auth.selectors';

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

// export const adminGuard: CanActivateFn = () => {
//   const authStore = inject(AuthStore);
//   const router = inject(Router);
//
//   const isAdmin = authStore.isAdmin();
//
//   if (isAdmin !== null) {
//     return !!isAdmin || router.createUrlTree(['/forbidden']);
//   }
//
//   // Если статус не загружен
//   authStore.loadUser();
//
//   return toObservable(authStore.isAdmin).pipe(
//     filter(val => val !== null),
//     map(val => !!val || router.createUrlTree(['/forbidden'])),
//     take(1)
//   );
// };
