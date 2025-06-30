import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CreateUsersButtonComponent } from '@users/feature-users-create';

import { UsersListVM } from './users-list-view-model';
import { UsersCardComponent } from '../users-card/users-card.component';
import { UsersVM } from '../users-vm';

@Component({
  selector: 'users-list-ui',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UsersCardComponent, MatProgressBarModule, CreateUsersButtonComponent],
})
export class UsersListComponent {
  @Input({ required: true })
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  onDeleteUser(user: UsersVM) {
    this.deleteUser.emit(user);
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }
}
