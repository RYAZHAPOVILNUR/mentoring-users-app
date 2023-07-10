import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersVM } from '../../../../users-vm';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsersEntity } from '@users/core/data-access';

@Component({
  selector: 'users-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  @Input({ required: true })
  user!: UsersVM;

  @Input({ required: true })
  loggedUser!: UsersEntity;

  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter()

  onDeleteUser(event: Event) {
    event.stopPropagation()
    this.deleteUser.emit();
  }

  redirectToEditPage(editMode: boolean, event: Event) {
    event.stopPropagation();
    const emitData = {
      id: this.user.id,
      editMode
    }
    this.redirectToEdit.emit(emitData)
  }
}
