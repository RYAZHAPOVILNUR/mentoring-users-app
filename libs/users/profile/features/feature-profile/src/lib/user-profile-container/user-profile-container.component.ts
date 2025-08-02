import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { filter, tap } from 'rxjs';

import { AuthStore } from '@users/core/data-access-auth';
import { UsersFacade } from '@users/users/data-access-user';

import { ProfileComponent } from '../feature-user-info/profile.component';

@Component({
  standalone: true,
  imports: [ProfileComponent, CommonModule, LetDirective],
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainerComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly authStore = inject(AuthStore);

  public readonly status = this.authStore.status;
  public readonly isLoggedUser = this.authStore.isAuthenticated;

  public readonly user$ = this.usersFacade.openedUser$.pipe(
    tap(() => this.usersFacade.loadUser()),
    filter(Boolean),
  );
}
