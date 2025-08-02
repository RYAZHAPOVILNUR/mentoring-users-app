import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoadingStatus } from '@shared/util-store';
import { DeepReadonly } from '@shared/util-typescript';
import { UserEntity, UserVM } from '@users/shared/data-access-models';
import { CreateUserButtonComponent } from '@users/users/feature-user-create';

import { UserCardComponent } from '../user-card/user-card.component';

type UsersListVM = DeepReadonly<{
  users: UserVM[];
  status: LoadingStatus;
  errors: HttpErrorResponse | null;
  loggedUser: UserEntity | null;
}>;

@Component({
  selector: 'users-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UserCardComponent, MatProgressBarModule, CreateUserButtonComponent],
})
export class UserListComponent {
  @Input({ required: true })
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  onDeleteUser(user: UserVM) {
    this.deleteUser.emit(user);
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }
}
