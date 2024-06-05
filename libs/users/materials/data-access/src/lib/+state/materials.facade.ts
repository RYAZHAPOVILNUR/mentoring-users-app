import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
// import { Observable, of, switchMap } from 'rxjs';
// import { MaterialsErrors } from './materials.reducer';
// import { selectLoggedUser } from '@auth/data-access';
// import { CreateUserDTO, UsersEntity } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.select(MaterialsSelectors.isLoadingSelector);
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders);
  // public readonly filteredUsers$ = this.store.select(UsersSelectors.filteredUsersSelector);
  // public readonly selectedUsers$ = this.store.select(UsersSelectors.selectEntity);
  // public readonly openedUser$ = this.store.select(UsersSelectors.selectOpenedUser);
  // public readonly loggedUser$ = this.store.select(selectLoggedUser);
  // public readonly errors$: Observable<UsersErrors | null> = this.store.select(UsersSelectors.selectUsersError);
  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  
  initFolders() {
    this.store.dispatch(MaterialsActions.getFolders());
  }

  // deleteUser(id: number) {
  //   this.store.dispatch(UsersActions.deleteUser({ id }));
  // }

  // addUser(userData: CreateUserDTO) {
  //   this.store.dispatch(UsersActions.addUser({ userData }));
  // }

  // addStoryPoints(userData: CreateUserDTO, id: number, onSuccessAddSP: onSuccessEditionCbType) {
  //   this.store.dispatch(UsersActions.addUserStoryPoints({ userData, id, onSuccessAddSP }));
  // }

  // editUser(userData: CreateUserDTO, id: number, onSuccessCb: onSuccessEditionCbType) {
  //   this.store.dispatch(UsersActions.editUser({ userData, id, onSuccessCb }));
  // }

  // getUserFromStore(id: number) {
  //   return this.store.select(UsersSelectors.selectUserById(id)).pipe(
  //     switchMap((user: UsersEntity | undefined): Observable<UsersEntity | null> => {
  //       if (user) {
  //         return of(user);
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   );
  // }

  // loadUser() {
  //   this.store.dispatch(UsersActions.loadUser());
  // }

  // setUsersFilter(filter: { name: string }) {
  //   this.store.dispatch(UsersActions.setUsersFilter({ filter }));
  // }
}
