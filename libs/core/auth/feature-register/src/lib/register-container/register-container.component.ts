import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';
import { Router } from '@angular/router';
import { AuthStore, NewUser } from '@auth/data-access';

@Component({
  selector: 'users-register-container',
  standalone: true,
  imports: [CommonModule, RegisterFormUiComponent],
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly router = inject(Router);
  private readonly authSignalStore = inject(AuthStore);

  onRedirectToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister(userData: NewUser) {
    this.authSignalStore.register(userData);
  }
}
