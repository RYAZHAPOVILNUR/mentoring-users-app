import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersVM} from '../users-vm';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {UsersAdminService} from "../users-admin.service";

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
  private usersAdmin = inject(UsersAdminService)

  onDelete(userId: number) {
    this.usersAdmin.modifyUserCard({userId, mod: 'delete'})
  }
}
