import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersVM } from '../../../../users-vm';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsersEntity } from '@users/core/data-access';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
  ],
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
  @Output() redirectToEdit = new EventEmitter();

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteUser(event: Event) {
    this.deleteUser.emit();
  }

  redirectToEditPage(
    editMode: boolean,
    editStoryPointsMode: boolean,
    event: Event
  ) {
    const emitData = {
      id: this.user.id,
      editMode,
      editStoryPointsMode,
    };
    this.redirectToEdit.emit(emitData);
  }
}
