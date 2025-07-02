import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { UsersEntity } from '@users/core/data-access-models';

import { UsersVM } from '../users-vm';

@Component({
  selector: 'users-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  @Input({ required: true })
  user!: UsersVM;

  @Input({ required: true })
  loggedUser!: UsersEntity;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteUser() {
    this.deleteUser.emit();
  }

  redirectToEditPage(editMode: boolean) {
    const emitData = {
      id: this.user.id,
      editMode,
    };
    this.redirectToEdit.emit(emitData);
  }
}
