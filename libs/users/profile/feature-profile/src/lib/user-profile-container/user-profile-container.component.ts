import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeatureUserInfoComponent } from 'libs/users/profile/feature-user-info/feature-user-info.component';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UsersFacade } from '@users/users/data-access';
import { UsersEntity } from '@users/core/data-access';
import { AuthFacade } from '@auth/data-access';

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
  public readonly user$: Observable<UsersEntity | any> = this.usersFacade.openedUser$.pipe(
    tap((_) => this.usersFacade.loadUser()),
  );
}
