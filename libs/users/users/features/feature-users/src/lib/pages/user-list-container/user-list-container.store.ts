import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap } from 'rxjs';

import { DeepReadonly } from '@shared/util-typescript';
import { userAdapter, UserEntity, UserVM } from '@users/shared/data-access-models';
import { UserDialogService, UsersFacade } from '@users/users/data-access-user';

type UserListState = DeepReadonly<{
  users: UserVM[];
}>;

const initialState: UserListState = {
  users: [],
};

@Injectable()
export class UserListContainerStore extends ComponentStore<UserListState> {
  private readonly usersFacade = inject(UsersFacade);
  private readonly userDialogService = inject(UserDialogService);
  public readonly users$ = this.select(({ users }) => users);
  public readonly status$ = this.select(this.usersFacade.status$, (status) => status);
  public errors$ = this.select(this.usersFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  public deleteUser(user: UserVM): void {
    const dialogRef = this.userDialogService.openDeleteUserConfirmDialog(user);

    this.effect(() =>
      dialogRef.afterClosed().pipe(
        filter(Boolean),
        tap(() => this.usersFacade.deleteUser(user.id)),
      ),
    );
  }

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() => this.usersFacade.filteredUsers$.pipe(tap((users: UserEntity[]) => this.patchUsers(users))));
  }

  private patchUsers(users: UserEntity[]): void {
    this.patchState({
      users: users.map((user) => userAdapter.entityToVM(user)),
    });
  }
}
