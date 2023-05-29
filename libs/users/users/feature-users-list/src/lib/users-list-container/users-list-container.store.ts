import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { UsersEntity, UsersFacade } from "@users/users/data-access";
import { DeepReadonly } from '@users/core/utils'
import { UsersVM } from "../users-vm";
import { tap } from "rxjs";
import { usersVMAdapter } from "../users-vm.adapter";

type UsersListState = DeepReadonly<{
  users: UsersVM[]
}>

const initialState: UsersListState = {
  users: []
}

@Injectable()
export class UsersListContainerStore extends ComponentStore<UsersListState> {
  private readonly usersFacade = inject(UsersFacade);
  public readonly users$ = this.select(({users}) => users);
  public readonly status$ = this.select(
    this.usersFacade.status$,
    (status) => status
  );

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(
      () => this.usersFacade.allUsers$.pipe(
        tap((users: UsersEntity[]) => this.patchUsers(users))
      )
    )
  }

  public deleteUser(id: number): void {
    this.usersFacade.deleteUser(id)
  }

  private patchUsers(users: UsersEntity[]): void {
    this.patchState({
      users: users.map(
        user => usersVMAdapter.entityToVM(user)
      )
    })
  }
}
