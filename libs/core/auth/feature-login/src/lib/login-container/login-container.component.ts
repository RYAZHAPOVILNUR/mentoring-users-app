import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';

@Component({
  selector: 'users-login-container',
  standalone: true,
  imports: [CommonModule, LoginFormUiComponent],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {}
