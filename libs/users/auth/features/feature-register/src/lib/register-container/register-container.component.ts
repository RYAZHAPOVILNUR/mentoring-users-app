import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore, NewUser } from '@users/core/data-access-auth';

import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';

@Component({
  standalone: true,
  imports: [RegisterFormUiComponent],
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);

  onRedirectToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister(user: NewUser) {
    this.authStore.register({ user });
    this.router.navigate(['/profile']);
  }
}
