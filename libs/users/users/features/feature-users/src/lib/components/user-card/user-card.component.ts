import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { UserEntity, UserVM } from '@users/shared/data-access-models';

import { UserRedirectPayload } from '../../interfaces/user-redirect-payload.interface';

@Component({
  selector: 'users-user-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({ required: true }) user!: UserVM;
  @Input({ required: true }) loggedUser!: UserEntity;

  @ViewChild(MatMenuTrigger, { static: true }) trigger!: MatMenuTrigger;

  @Output() userDelete = new EventEmitter<void>();
  @Output() userRedirect = new EventEmitter<UserRedirectPayload>();

  onOpenMenu(event: Event): void {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteUser(): void {
    this.userDelete.emit();
  }

  redirectToEditPage(editMode: boolean): void {
    const emitData: UserRedirectPayload = {
      id: this.user.id,
      editMode,
    };
    this.userRedirect.emit(emitData);
  }
}
