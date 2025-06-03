import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../+state/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from '../+state/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authSignalStore = inject(AuthStore);
  const authService = inject(AuthService);

  return toObservable(authSignalStore.isAdmin).pipe(
    tap((isAdmin) => {
      if (isAdmin === null) {
        authService.getUser();
      }
    }),
    filter((isAdmin) => isAdmin !== null),
    map((isAdmin) => !!isAdmin),
  );
};
