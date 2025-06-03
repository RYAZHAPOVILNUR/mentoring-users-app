import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';
import { AuthStore, SignAuthPayload } from '@auth/data-access';
import { Router } from '@angular/router';
import { AuthService } from 'libs/core/auth/data-access/src/lib/+state/auth.service';

@Component({
  selector: 'users-login-container',
  standalone: true,
  imports: [CommonModule, LoginFormUiComponent],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogin(userData: SignAuthPayload) {
    this.authService.login(userData);
  }

  onRedirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
