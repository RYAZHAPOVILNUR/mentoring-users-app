import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../+state/auth.selectors';
import { catchError, filter, map, take, throwError, timeout } from 'rxjs';


export const adminResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);
  return store.select(selectIsAdmin).pipe(
    filter(isAdmin => isAdmin !== null),
    take(1),
    timeout(5000), // Таймаут в 5 секунд
    catchError(error => {
      console.log('Timeout occurred');
      return throwError('Timeout occurred'); // Выдаем ошибку
    }),
    map(isAdmin => !!isAdmin)
  );
};
