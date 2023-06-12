import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailUsersCardComponent } from '../detail-users-card/detail-users-card.component';
import { CreateUserDTO, UsersEntity, UsersStatus } from '@users/users/data-access';

@Component({
  selector: 'users-detail-card-container',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent],
  templateUrl: './users-detail-card-container.component.html',
  styleUrls: ['./users-detail-card-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailCardContainerComponent {
  @Input() status!: UsersStatus
  @Input() user!: UsersEntity;
  @Input() editMode!: boolean;

  @Output() editUser = new EventEmitter<CreateUserDTO>();
  @Output() closeUser = new EventEmitter();

  onEditUser(userData: CreateUserDTO) {
    this.editUser.emit(userData);
  }

  onCloseUser(){
    this.closeUser.emit();
  }
}
