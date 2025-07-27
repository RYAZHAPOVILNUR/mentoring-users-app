import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { UserEntity, UserVM } from '@users/shared/data-access-models';

@Component({
  selector: 'users-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true })
  user!: UserVM;

  @Input({ required: true })
  loggedUser!: UserEntity;

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
