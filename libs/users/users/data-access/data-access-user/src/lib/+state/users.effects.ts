import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { selectRouteParams } from '@shared/util-store';
import { userAdapter, UserDTO, UserEntity } from '@users/shared/data-access-models';
import { authSelectors } from '@users/core/data-access-auth';

import * as UsersActions from './users.actions';
import { selectUsersEntities } from './users.selectors';
import { CreateUserDTO } from '../types/create-user-dto.type';
import { EditUserDTO } from '../types/edit-user-dto.type';

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(UsersActions.initUsers),

      switchMap(() =>
        apiService.get<UserDTO[]>('/users').pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users: users.map((user) => userAdapter.DTOtoEntity(user)),
            }),
          ),
          catchError((error) => {
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

      switchMap(({ id }) =>
        apiService.delete<void>(`/users/${id}`).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) => {
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

      switchMap(({ userData }) =>
        apiService.post<UserDTO, CreateUserDTO>('/users', userData).pipe(
          map((user) => userAdapter.DTOtoEntity(user)),
          map((userEntity) => UsersActions.addUserSuccess({ userData: userEntity })),
          catchError((error) => {
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
      filter(([{ user }, usersEntities]) => Boolean(usersEntities[user.id])),
      map(([{ user, onSuccessCb }, usersEntities]) => ({
        user: {
          ...userAdapter.entityToDTO(<UserEntity>usersEntities[user.id]),
          ...user,
        },
        onSuccessCb,
      })),
      switchMap(({ user, onSuccessCb }) =>
        apiService.post<UserDTO, EditUserDTO>(`/users/${user.id}`, user).pipe(
          map((userData) => ({ userData, onSuccessCb })),
          tap(({ onSuccessCb }) => onSuccessCb()),
          map(({ userData }) => UsersActions.editUserSuccess({ userData })),
          catchError((error) => {
            return of(UsersActions.editUserFailed({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const addStoryPoints = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(UsersActions.addStoryPoints),
      withLatestFrom(store.select(authSelectors.selectLoggedUser)),
      switchMap(([{ storyPoints, onSuccessCb }, loggedUser]) => {
        if (!loggedUser) {
          return of(
            UsersActions.addStoryPointsFailed({
              error: new HttpErrorResponse({ error: 'User not logged in' }),
            }),
          );
        }

        const updateData = {
          id: loggedUser.id,
          purchaseDate: '2023-12-01',
          educationStatus: 'trainee',
          name: loggedUser.name,
          email: loggedUser.email,
          username: loggedUser.username || null,
          city: loggedUser.city || null,
          totalStoryPoints: storyPoints,
          photo: loggedUser.photo || null,
        };

        return apiService.post<any, any>(`/users/${loggedUser.id}`, updateData).pipe(
          map((response) => ({ response, onSuccessCb })),
          tap(({ onSuccessCb }) => onSuccessCb()),
          map(({ response }) => {
            return UsersActions.addStoryPointsSuccess({
              userData: response,
            });
          }),
          catchError((error) => {
            return of(UsersActions.addStoryPointsFailed({ error }));
          }),
        );
      }),
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
