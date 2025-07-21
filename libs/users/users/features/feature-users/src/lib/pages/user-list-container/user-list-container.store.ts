import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';

import { CoreUiConfirmDialogComponent } from '@core/ui-core';
import { DeepReadonly } from '@shared/util-typescript';
import { UserEntity, userAdapter, UserVM } from '@users/shared/data-access-models';
import { UsersFacade } from '@users/users/data-access-user';

type UserListState = DeepReadonly<{
  users: UserVM[];
}>;

const initialState: UserListState = {
  users: [],
};

@Injectable()
export class UserListContainerStore extends ComponentStore<UserListState> {
  private readonly usersFacade = inject(UsersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly users$ = this.select(({ users }) => users);
  public readonly status$ = this.select(this.usersFacade.status$, (status) => status);
  public errors$ = this.select(this.usersFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  public deleteUser(user: UserVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${user.name}` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.usersFacade.deleteUser(user.id);
        }),
      ),
    );
  }
  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() => this.usersFacade.allUsers$.pipe(tap((users: UserEntity[]) => this.patchUsers(users))));
  }

  private patchUsers(users: UserEntity[]): void {
    this.patchState({
      users: users.map((user) => userAdapter.entityToVM(user)),
    });
  }
}
