import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignAuthPayload } from '@users/core/data-access-models';

import { AuthStore } from '@users/core/data-access-auth';

import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';

@Component({
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
    this.authStore.login({ userData });
  }

  onRedirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
