import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { authActions, NewUser } from '@users/data-access-auth';

import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';

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
  private readonly store = inject(Store);

  onRedirectToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister(userData: NewUser) {
    this.store.dispatch(authActions.register({ userData }));
  }
}
