import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { Observable, of, switchMap, take } from 'rxjs';
import { UsersErrors } from './users.reducer';
import { onSuccessEditionCbType, storyPointsActions } from './users.actions';
import { selectLoggedUser } from '@auth/data-access';
import { CreateUserDTO, UsersEntity, UserStoryPoints } from '@users/core/data-access';

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
  public readonly filteredUsers$ = this.store.pipe(select(UsersSelectors.selectFilteredUsers));
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

  public filterUsers(name: string): void {
    this.store.dispatch(UsersActions.setUsersFilter({ filter: { name } }));
  }

  public addStoryPoints(payload: UserStoryPoints): void {
    this.store
      .select(UsersSelectors.selectUserById(payload.userId))
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          const userWithStoryPoints = { ...user, totalStoryPoints: payload.storyPoints };
          this.store.dispatch(storyPointsActions.addStoryPoints({ userWithStoryPoints }));
        }
      });
  }
}
