import {inject, Injectable} from '@angular/core';
import {UsersListContainerStore} from "./users-list-container/users-list-container.store";

type CardChanges = {
  userId: number;
  mod: 'delete' | 'edit';
}

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {
  private readonly componentStore = inject(UsersListContainerStore);

  modifyUserCard(changes: CardChanges): void {
    if (changes.mod === 'delete') {
      this.componentStore.deleteUser(changes.userId)
    }
  }
}
