import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';

import { AuthStore, SignAuthPayload } from '@users/core/data-access-auth';

import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';

@Component({
  standalone: true,
  imports: [LoginFormUiComponent],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    toObservable(this.authStore.loggedUser)
      .pipe(
        filter(Boolean),
        tap(() => this.router.navigate(['/profile']), takeUntilDestroyed(this.destroyRef)),
      )
      .subscribe(console.log);
  }

  onLogin(data: SignAuthPayload) {
    this.authStore.login({ data });
  }

  onRedirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
