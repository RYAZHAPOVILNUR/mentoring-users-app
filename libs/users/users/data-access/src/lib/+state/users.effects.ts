import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as UsersActions from './users.actions';
import { ApiService } from '@users/core/http';
import { CreateUserDTO, UsersDTO } from '../users-dto.model';
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

export const deleteUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(
        ({ id }) => apiService.delete<void>(`/users/${id}`).pipe(
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

export const addUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(
        ({ userData }) => apiService.post<UsersDTO, CreateUserDTO>('/users', userData).pipe(
          map((user) => UsersActions.addUserSuccess({ userData: user })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addUserFailed({ error }))
          })
        )))
  }, { functional: true }
)

export const editUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap(
        ({ userData, id }) => apiService.post<UsersDTO, CreateUserDTO>(`/users/${id}`, userData).pipe(
          map((userData) => UsersActions.addUserSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.editUserFailed({ error }))
          })
        )
      )
    )
  }, { functional: true }
)
