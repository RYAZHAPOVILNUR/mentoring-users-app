import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  of,
  map,
  withLatestFrom,
  filter,
  tap,
} from 'rxjs';
import * as UsersActions from './users.actions';
import { ApiService } from '@users/core/http';
import { Store, select } from '@ngrx/store';
import { selectUsersEntities } from './users.selectors';
import {
  CreateUserDTO,
  UsersDTO,
  UsersEntity,
  selectRouteParams,
  usersDTOAdapter,
} from '@users/core/data-access';

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      // delay(1500),
      switchMap(() =>
        apiService.get<UsersDTO[]>('/users').pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users: users.map((user) => usersDTOAdapter.DTOtoEntity(user)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.loadUsersFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/users/${id}`).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.deleteUserFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.addUser),
      // delay(1500),
      switchMap(({ userData }) =>
        apiService.post<UsersDTO, CreateUserDTO>('/users', userData).pipe(
          map((user) => usersDTOAdapter.DTOtoEntity(user)),
          map((userEntity) =>
            UsersActions.addUserSuccess({ userData: userEntity })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addUserFailed({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const editUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const usersEntities$ = inject(Store).pipe(select(selectUsersEntities));

    return actions$.pipe(
      ofType(UsersActions.editUser),
      withLatestFrom(usersEntities$),
      filter(([{ id }, usersEntities]) => Boolean(usersEntities[id])),
      map(([{ userData, id, onSuccessCb }, usersEntities]) => ({
        user: {
          ...usersDTOAdapter.entityToDTO(<UsersEntity>usersEntities[id]),
          name: userData.name,
          email: userData.email,
          username: userData.username,
          city: userData.city,
        },
        onSuccessCb,
      })),
      switchMap(({ user, onSuccessCb }) =>
        apiService
          .post<UsersDTO, CreateUserDTO>(`/users/${user.id}`, user)
          .pipe(
            map((userData) => ({ userData, onSuccessCb })),
            tap(({ onSuccessCb }) => onSuccessCb()),
            map(({ userData }) => UsersActions.editUserSuccess({ userData })),
            catchError((error) => {
              console.error('Error', error);
              return of(UsersActions.editUserFailed({ error }));
            })
          )
      )
    );
  },
  { functional: true }
);

export const loadUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(UsersActions.loadUser),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<UsersDTO>(`/users/${params['id']}`).pipe(
            map((user) => usersDTOAdapter.DTOtoEntity(user)),
            map((userEntity) =>
              UsersActions.loadUserSuccess({ userData: userEntity })
            ),
            catchError((error) => {
              console.error('Error', error);
              return of(UsersActions.loadUserFailed({ error }));
            })
          );
        }
        return of(UsersActions.updateUserStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
