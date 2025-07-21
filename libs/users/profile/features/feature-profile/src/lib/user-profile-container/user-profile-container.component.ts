import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { filter, of, tap } from 'rxjs';

import { AuthFacade } from '@users/core/data-access-auth';
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
  private readonly authFacade = inject(AuthFacade);

  public readonly isLoggedUser = of(false);

  public readonly status$ = this.authFacade.status$;
  public readonly user$ = this.usersFacade.openedUser$.pipe(
    tap(() => this.usersFacade.loadUser()),
    filter(Boolean),
  );
}
