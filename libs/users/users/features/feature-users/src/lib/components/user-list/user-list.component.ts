import { NgForOf, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingStatus } from '@shared/util-store';
import { DeepReadonly } from '@shared/util-typescript';
import { UserEntity, UserVM } from '@users/shared/data-access-models';
import { CreateUserButtonComponent } from '@users/users/feature-user-create';

import { UserRedirectPayload } from '../../interfaces/user-redirect-payload.interface';
import { UserCardComponent } from '../user-card/user-card.component';

type UsersListVM = DeepReadonly<{
  users: UserVM[];
  status: LoadingStatus;
  errors: HttpErrorResponse | null;
  loggedUser: UserEntity;
}>;

@Component({
  selector: 'users-user-list',
  standalone: true,
  imports: [NgIf, NgForOf, UserCardComponent, MatProgressBarModule, CreateUserButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input({ required: true }) vm!: UsersListVM;

  @Output() userDelete = new EventEmitter<UserVM>();
  @Output() userRedirect = new EventEmitter<UserRedirectPayload>();

  onDeleteUser(user: UserVM): void {
    this.userDelete.emit(user);
  }

  onRedirectToEdit(payload: UserRedirectPayload): void {
    this.userRedirect.emit(payload);
  }
}
