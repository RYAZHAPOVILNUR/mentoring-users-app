import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, delay } from 'rxjs';
import * as UsersActions from './users.actions';
import { ApiService } from '@users/core/http';
import { CreateUserDTO, UsersDTO } from '../users-dto.model';
import { usersDTOAdapter } from '../users-dto.adapter';
import { Store, select } from '@ngrx/store';
import { selectUsersEntities } from './users.selectors';
import { UsersEntity } from './users.entity';
import { selectRouteParams } from '@users/core/data-access';

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log)

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      delay(1500),
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
      delay(1500),
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
      delay(1500),
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
    const usersEntities$ = inject(Store).pipe(select(selectUsersEntities));

    return actions$.pipe(
      ofType(UsersActions.editUser),
      withLatestFrom(usersEntities$),
      filter(([{ id }, usersEntities]) => Boolean(usersEntities[id])),
      // map(([{userData, id}, usersEntities]) => ({
      //   ...usersDTOAdapter.entityToDTO(<UsersEntity>usersEntities[id]),
      //   name: userData.name,
      //   email: userData.email
      // })),
      map(([editUserPayload, usersEntities]) => {
        const idUserToEdit = editUserPayload.id;
        const usersEntityToEdit = <UsersEntity>usersEntities[idUserToEdit];
        const dtoUser = usersDTOAdapter.entityToDTO(usersEntityToEdit);
        const dtoToUpdateUser = {
          ...dtoUser,
          name: editUserPayload.userData.name,
          email: editUserPayload.userData.email
        }

        return dtoToUpdateUser;
      }),
      delay(1500),
      switchMap(
        (user) => apiService.post<UsersDTO, UsersDTO>(`/users/${user.id}`, user).pipe(
          map((userData) => UsersActions.editUserSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.editUserFailed({ error }))
          })
        )
      )
    )
  }, { functional: true }
)

export const updateUserStatusWithDelay = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(UsersActions.editUserSuccess),
      delay(10),
      map(() => UsersActions.updateUserStatus({ status: 'loaded' }))
    )
  }, {functional: true})

export const loadUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(UsersActions.loadUser),
      withLatestFrom(store.select(selectRouteParams)),
      delay(1500),
      switchMap(
        ([, params]) => {
          if (params['id']) {
            return apiService.get<UsersDTO>(`/users/${params['id']}`)
              .pipe(
                map((userData) => UsersActions.loadUserSuccess({ userData })),
                catchError((error) => {
                  console.error('Error', error);
                  return of(UsersActions.loadUserFailed({ error }))
                })
              )
          }
          return of(UsersActions.updateUserStatus({ status: 'loading' }));
        }
      )
    )
  }, { functional: true }
)
