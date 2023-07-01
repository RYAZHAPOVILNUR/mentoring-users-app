import { inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../+state/auth.selectors';
import { catchError, filter, map, take, tap, throwError, timeout } from 'rxjs';
import {  adminResolver } from './admin.resolver';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

// export const adminGuard = () => {
//   const store = inject(Store);
//   return store.select(selectIsAdmin).pipe(
//     take(1),
//     tap((isAdmin) => console.log('isadmin',!!isAdmin)),
//     map(isAdmin => !!isAdmin)
//   )
// };

// export const adminGuard = (route: ActivatedRoute) => {
//   const isAdmin = route.data.pipe(
//     map((data) => data?.['isAdmin'])
//   )
//   if (isAdmin) {
//     // User is an admin
//     return true;
//   } else {
//     // User is not an admin
//     return false;
//   }
// };
export const adminGuard = (route: ActivatedRouteSnapshot) => {
  const isAdmin = route
  console.log(isAdmin)
  // if (isAdmin) {
  //   // User is an admin
  //   return true;
  // } else {
  //   // User is not an admin
  //   return false;
  // }
};
