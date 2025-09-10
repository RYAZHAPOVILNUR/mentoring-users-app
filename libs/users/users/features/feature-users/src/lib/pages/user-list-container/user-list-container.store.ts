import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap } from 'rxjs';

import { DeepReadonly } from '@shared/util-typescript';
import { userAdapter, UserEntity, UserVM } from '@users/shared/data-access-models';
import { UsersFacade } from '@users/users/data-access-user';
import { UserDialogService } from '@users/users/feature-user-dialog';

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

  readonly users$ = this.select(({ users }) => users);
  readonly status$ = this.select(this.usersFacade.status$, (status) => status);
  readonly errors$ = this.select(this.usersFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  deleteUser(user: UserVM): void {
    const dialogRef = this.userDialogService.openDeleteUserConfirmDialog(user);

    this.effect(() =>
      dialogRef.afterClosed().pipe(
        filter(Boolean),
        tap(() => this.usersFacade.deleteUser(user.id)),
      ),
    );
  }

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() => this.usersFacade.allUsers$.pipe(tap(this.patchUsers.bind(this))));
  }

  private patchUsers(users: UserEntity[]): void {
    this.patchState({ users: users.map(userAdapter.entityToVM) });
  }
}
