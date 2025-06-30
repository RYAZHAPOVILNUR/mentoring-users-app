import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFacade } from '@auth/data-access';
import { LetDirective } from '@ngrx/component';
import { UsersFacade } from '@users/users/data-access';
import { filter, of, tap } from 'rxjs';

import { FeatureUserInfoComponent } from '../feature-user-info/feature-user-info.component';

@Component({
  selector: 'users-profile-container',
  standalone: true,
  imports: [FeatureUserInfoComponent, CommonModule, LetDirective],
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
