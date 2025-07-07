import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';

import { authSelectors } from '@users/core/data-access-auth';
import { UsersEntity } from '@users/core/data-access-models';

import * as UsersActions from './users.actions';
import { onSuccessEditionCbType } from './users.actions';
import * as UsersSelectors from './users.selectors';
import { CreateUserDTO } from '../types/create-user-dto.type';

import { selectFilteredUsers } from './users.selectors';
import { setUsersFilter } from './users.actions';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.pipe(select(UsersSelectors.selectUsersStatus));
  public readonly allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  public readonly selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));
  public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);
  public readonly loggedUser$ = this.store.select(authSelectors.selectLoggedUser);
  public readonly filteredUsers$ = this.store.select(selectFilteredUsers);
  public readonly errors$: Observable<HttpErrorResponse | null> = this.store.pipe(
    select(UsersSelectors.selectUsersError),
  );
  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  addUser(userData: CreateUserDTO) {
    this.store.dispatch(UsersActions.addUser({ userData }));
  }

  editUser(userData: CreateUserDTO, id: number, onSuccessCb: onSuccessEditionCbType) {
    this.store.dispatch(UsersActions.editUser({ userData, id, onSuccessCb }));
  }

  getUserFromStore(id: number) {
    return this.store.select(UsersSelectors.selectUserById(id)).pipe(
      switchMap((user: UsersEntity | undefined): Observable<UsersEntity | null> => {
        if (user) {
          return of(user);
        } else {
          return of(null);
        }
      }),
    );
  }

  loadUser() {
    this.store.dispatch(UsersActions.loadUser());
  }

  setUsersFilter(filter: { name: string }) {
    this.store.dispatch(setUsersFilter({ filter }));
  }
}
