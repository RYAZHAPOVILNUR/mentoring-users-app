import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';
import { Store } from '@ngrx/store';
import { authActions, SignAuthPayload } from '@auth/data-access';
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
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  onLogin(userData: SignAuthPayload) {
    this.store.dispatch(authActions.login({ userData }));
  }

  onRedirectToSignup() {
    this.router.navigate(['/signup']);
  }
}