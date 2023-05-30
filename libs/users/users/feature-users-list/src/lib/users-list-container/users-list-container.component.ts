import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from '../users-list/users-list.component';
import {UsersListContainerStore} from './users-list-container.store';
import {CardChanges} from "../users-card/users-card.component";

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore]
})
export class UsersListContainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;

  public modifyUserCard({userId, mod}: CardChanges): void {
    if (mod === 'delete') {
      this.componentStore.deleteUser(userId)
    }
  }
}
