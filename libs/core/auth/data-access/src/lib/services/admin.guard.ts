import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../+state/auth.selectors';
import { filter, map, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { authActions } from '@auth/data-access';


export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const localStorageJwtService = inject(LocalStorageJwtService);

  return store.select(selectIsAdmin).pipe(
    tap(isAdmin => {
      if (isAdmin === null && localStorageJwtService.getItem()) {
        store.dispatch(authActions.getUser());
      }
    }),
    filter(isAdmin => isAdmin !== null),
    map(isAdmin => {
      console.log(!!isAdmin);
      return !!isAdmin;
    })
  );
}
