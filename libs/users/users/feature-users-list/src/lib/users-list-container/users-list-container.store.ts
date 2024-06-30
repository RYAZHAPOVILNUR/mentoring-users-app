import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UsersFacade } from '@users/users/data-access';
import { DeepReadonly } from '@users/core/utils';
import { UsersVM } from '../../../../users-vm';
import { tap } from 'rxjs';
import { usersVMAdapter } from '../../../../users-vm.adapter';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { UsersEntity } from '@users/core/data-access';

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
