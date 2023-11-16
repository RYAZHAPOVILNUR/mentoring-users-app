import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';
import { Router } from '@angular/router';
import { NewUser, authActions } from '@auth/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-register-container',
  standalone: true,
  imports: [CommonModule, RegisterFormUiComponent],
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly router = inject(Router)
  private readonly store = inject(Store)

  onRedirectToLogin() {
    this.router.navigate(['/login'])
  }

  onRegister(userData: NewUser) {
    this.store.dispatch(authActions.register({ userData }))
  }
}
