import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';
import { UserDTO, userAdapter, UserEntity } from '@users/shared/data-access-models';

import * as UsersActions from './users.actions';
import { selectUsersEntities } from './users.selectors';
import { CreateUserDTO } from '../types/create-user-dto.type';

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      // delay(1500),
      switchMap(() =>
        apiService.get<UserDTO[]>('/users').pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users: users.map((user) => userAdapter.DTOtoEntity(user)),
            }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.loadUsersFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
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
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const addUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.addUser),
      // delay(1500),
      switchMap(({ userData }) =>
        apiService.post<UserDTO, CreateUserDTO>('/users', userData).pipe(
          map((user) => userAdapter.DTOtoEntity(user)),
          map((userEntity) => UsersActions.addUserSuccess({ userData: userEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addUserFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
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
          ...userAdapter.entityToDTO(<UserEntity>usersEntities[id]),
          name: userData.name,
          email: userData.email,
          username: userData.username,
          city: userData.city,
        },
        onSuccessCb,
      })),
      switchMap(({ user, onSuccessCb }) =>
        apiService.post<UserDTO, CreateUserDTO>(`/users/${user.id}`, user).pipe(
          map((userData) => ({ userData, onSuccessCb })),
          tap(({ onSuccessCb }) => onSuccessCb()),
          map(({ userData }) => UsersActions.editUserSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.editUserFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
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
          return apiService.get<UserDTO>(`/users/${params['id']}`).pipe(
            map((user) => userAdapter.DTOtoEntity(user)),
            map((userEntity) => UsersActions.loadUserSuccess({ userData: userEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(UsersActions.loadUserFailed({ error }));
            }),
          );
        }
        return of(UsersActions.updateUserStatus({ status: 'loading' }));
      }),
    );
  },
  { functional: true },
);

export const addStoryPoints = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const usersEntities$ = inject(Store).pipe(select(selectUsersEntities));

    return actions$.pipe(
      ofType(UsersActions.addStoryPoints),
      withLatestFrom(usersEntities$),
      filter(([{ id }, usersEntities]) => Boolean(usersEntities[id])),
      map(([{ userData, id, onSuccessAddSp }, usersEntities]) => {
        const oldUser = userAdapter.entityToDTO(<UserEntity>usersEntities[id]);
        return {
          user: {
            ...oldUser,
            totalStoryPoints: userData.totalStoryPoints,
          },
          onSuccessAddSp,
        };
      }),
      switchMap(({ user, onSuccessAddSp }) =>
        apiService.post<UserDTO, CreateUserDTO>(`/users/${user.id}`, user).pipe(
          map((userData) => ({ userData, onSuccessAddSp })),
          tap(({ onSuccessAddSp }) => onSuccessAddSp?.()),
          map(({ userData }) => UsersActions.addStoryPointsSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addStoryPointsFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
