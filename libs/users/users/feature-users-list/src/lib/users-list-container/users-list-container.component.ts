import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersEntity, UsersFacade } from '@users/users/data-access';
import { UsersListVM } from '../users-list/users-list-view-model';
import { map } from 'rxjs';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListContainerComponent {

  private readonly userFacade = inject(UsersFacade);
  public readonly users$ = this.userFacade.allUsers$.pipe(
    map<UsersEntity[], UsersListVM>((users) => ({users}))
  );

  constructor() {
    this.userFacade.init()
  }
}
