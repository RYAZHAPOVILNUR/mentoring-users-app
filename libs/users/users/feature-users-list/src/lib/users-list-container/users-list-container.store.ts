import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { UsersEntity } from '@users/core/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { UsersFacade } from '@users/users/data-access';
import { tap } from 'rxjs';
import { UsersVM } from '../../../../users-vm';
import { usersVMAdapter } from '../../../../users-vm.adapter';

type UsersListState = DeepReadonly<{
  users: UsersVM[];
}>;

const initialState: UsersListState = {
  users: [],
};

@Injectable()
export class UsersListContainerStore extends ComponentStore<UsersListState> {
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

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(() => this.usersFacade.filteredUsers$.pipe(tap((users: UsersEntity[]) => this.patchUsers(users))));
  }

  private patchUsers(users: UsersEntity[]): void {
    this.patchState({
      users: users.map((user) => usersVMAdapter.entityToVM(user)),
    });
  }

  public deleteUser(user: UsersVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${user.name}` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.usersFacade.deleteUser(user.id);
        })
      )
    );
  }
}
