import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersVM} from '../users-vm';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

export type CardChanges = {
  userId: number;
  mod: 'delete' | 'edit';
}

@Component({
  selector: 'users-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCardComponent {
  @Input({required: true}) user!: UsersVM
  @Output() changeTrigger = new EventEmitter<CardChanges>();

  onDelete(userId: number) {
    this.changeTrigger.emit({userId, mod: "delete"})
  }

  onEdit(userId: number) {
    this.changeTrigger.emit({userId, mod: "edit"})
  }
}
