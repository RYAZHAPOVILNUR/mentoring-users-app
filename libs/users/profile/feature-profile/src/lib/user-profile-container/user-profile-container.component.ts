import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProfileFormUiComponent} from "../profile-form-ui/profile-form-ui.component";
import {LetDirective} from "@ngrx/component";
import {Store} from "@ngrx/store";
import {UsersFacade} from "@users/users/data-access";
import {selectAuthStatus} from "@auth/data-access";
import {filter, Observable, tap} from "rxjs";
import {UsersEntity} from "@users/core/data-access";

@Component({
  selector: 'users-profile-container',
  standalone: true,
  imports: [
    CommonModule,
    ProfileFormUiComponent,
    LetDirective
  ],
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileContainerComponent {

  private readonly usersFacade = inject(UsersFacade);
  private readonly store = inject(Store);

  public readonly status$ = this.store.select(selectAuthStatus);
  public readonly user$: Observable<UsersEntity | null> = this.usersFacade.openedUser$
    .pipe(
      tap(_ => this.usersFacade.loadUser())
    );
}
