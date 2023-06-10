import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailUsersCardComponent } from '../detail-users-card/detail-users-card.component';
import { CreateUserDTO } from "@users/users/data-access";
import {UsersDetailVM} from "./users-detail-view-model";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-users-page',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent],
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailComponent {
  @Input({required: true}) public vm!: UsersDetailVM
  @Output() userData = new EventEmitter<CreateUserDTO>();

  public onEditUser(userData: CreateUserDTO) {
    this.userData.emit(userData)
  }

}
