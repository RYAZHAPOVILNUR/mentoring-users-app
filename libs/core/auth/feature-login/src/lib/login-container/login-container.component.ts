import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';
import { AuthStore, SignAuthPayload } from '@auth/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login-container',
  standalone: true,
  imports: [CommonModule, LoginFormUiComponent],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  onLogin(userData: SignAuthPayload) {
    this.authStore.login(userData);
  }

  onRedirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
