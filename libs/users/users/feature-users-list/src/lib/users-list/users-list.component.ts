import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import { UsersCardComponent } from '../users-card/users-card.component';
import { UsersVM } from '../../../../users-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-list-ui',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UsersCardComponent, MatProgressBarModule],
})
export class UsersListComponent {
  @Input({ required: true })
  vm!: UsersListVM;
  store: Store = inject(Store)

  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  onDeleteUser(user: UsersVM) {
    this.deleteUser.emit(user);
    console.log(user)
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }
}
