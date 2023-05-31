import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-create-users-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-users-dialog.component.html',
  styleUrls: ['./create-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {}
