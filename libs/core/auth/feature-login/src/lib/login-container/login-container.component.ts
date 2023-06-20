import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';
import { Store } from '@ngrx/store';
import { AuthActions, SignAuthPayload } from '@auth/data-access';


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

  onLogin(userData: SignAuthPayload) {
    this.store.dispatch(AuthActions.login({userData}))
  }

}
