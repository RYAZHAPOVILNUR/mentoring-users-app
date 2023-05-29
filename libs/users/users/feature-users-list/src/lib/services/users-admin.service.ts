import {inject, Injectable} from '@angular/core';
import {UsersListContainerStore} from "../users-list-container/users-list-container.store";

type CardChanges = {
  cardId: number;
  mod: 'delete' | 'edit';
}

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {
  private readonly componentStore = inject(UsersListContainerStore);

  modifyUserCard(change: CardChanges): void {
    if (change.mod === 'delete') {
      this.componentStore.deleteUser(change.cardId)
    }
  }
}
