import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as UsersActions from './users.actions';
import { ApiService } from '@users/core/http';
import { UsersDTO } from '../users-dto.model';
import { usersDTOAdapter } from '../users-dto.adapter';

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log)

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(
        () => apiService.get<UsersDTO[]>('/users').pipe(
          map(
            (users) => UsersActions.loadUsersSuccess({
              users: users.map(user => usersDTOAdapter.DTOtoEntity(user))
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.loadUsersFailure({ error }));
          })
        )
      ),
    )
  }, { functional: true }
)

export const createUser = createEffect(() => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.createUser),
      switchMap(({ name, username, email }) => apiService.post(`/users`, { name, username, email }).pipe(
          map(() => UsersActions.createUserSuccess({ name, username, email })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.createUserFailed({ error }))
          })
        )
      ),
    )
  }, { functional: true }
)

export const deleteUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(
        ({ id }) => apiService.delete<UsersDTO[]>(`/users/${id}`).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.deleteUserFailed({ error }))
          })
        )
      ),
    )
  }, { functional: true }
)
