import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { AuthStore } from '../+state/auth.store';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);

  return toObservable(authStore.isAdmin);
};
