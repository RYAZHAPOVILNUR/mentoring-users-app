import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { AuthStore } from '../+state/auth.store';

export const authGuard = () => {
  const authStore = inject(AuthStore);

  if (!localStorage.getItem('jwtToken')) {
    authStore.logout();
  }

  return toObservable(authStore.loggedUser).pipe(filter(Boolean));
};
