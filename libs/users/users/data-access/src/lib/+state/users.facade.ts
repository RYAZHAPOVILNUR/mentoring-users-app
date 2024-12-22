import { inject, Injectable } from '@angular/core';
import { selectLoggedUser } from '@auth/data-access';
import { select, Store } from '@ngrx/store';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { Observable, of, switchMap } from 'rxjs';
import * as UsersActions from './users.actions';
import { onSuccessEditionCbType } from './users.actions';
import { UsersErrors, UsersFilter } from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly filteredUsers$ = this.store.pipe(select(UsersSelectors.filteredUsers));
  public readonly status$ = this.store.pipe(select(UsersSelectors.selectUsersStatus));
  public readonly allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  public readonly selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));
  public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);
  public readonly loggedUser$ = this.store.select(selectLoggedUser);
  public readonly errors$: Observable<UsersErrors | null> = this.store.pipe(select(UsersSelectors.selectUsersError));
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
      })
    );
  }

  loadUser() {
    this.store.dispatch(UsersActions.loadUser());
  }

  public filterUser(filter: UsersFilter): void {
    this.store.dispatch(UsersActions.setUsersFilter({ filter }));
  }
}
