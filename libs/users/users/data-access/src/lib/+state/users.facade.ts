import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { UsersErrors } from './users.reducer';
import { onSuccessEditionCbType } from './users.actions';
import { AuthStore } from '@auth/data-access';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store = inject(Store);
  private readonly authSignalStore = inject(AuthStore);

  public readonly status$ = this.store.pipe(select(UsersSelectors.selectUsersStatus));
  public readonly allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  public readonly selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));
  public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);
  public readonly loggedUser$ = toObservable(this.authSignalStore.loggedUser);
  public readonly errors$: Observable<UsersErrors | null> = this.store.pipe(select(UsersSelectors.selectUsersError));
  public readonly filteredUsers$ = this.store.select(UsersSelectors.filteredUsers);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  public init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  public addUser(userData: CreateUserDTO) {
    this.store.dispatch(UsersActions.addUser({ userData }));
  }

  public editUser(userData: CreateUserDTO, id: number, onSuccessCb: onSuccessEditionCbType) {
    this.store.dispatch(UsersActions.editUser({ userData, id, onSuccessCb }));
  }

  public getUserFromStore(id: number) {
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

  public loadUser() {
    this.store.dispatch(UsersActions.loadUser());
  }

  public filterUsers(name: string | '') {
    this.store.dispatch(UsersActions.setUsersFilter({ filter: { name } }));
  }
}
