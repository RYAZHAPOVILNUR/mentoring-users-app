import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-users-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './create-users-button.component.html',
  styleUrls: ['./create-users-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {}
