import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProfileFormUiComponent} from "../profile-form-ui/profile-form-ui.component";
import {LetDirective} from "@ngrx/component";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectUserById} from "@users/users/data-access";
import {selectAuthStatus} from "@auth/data-access";

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

  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  public readonly status$ = this.store.select(selectAuthStatus);
  public readonly user$ = this.store.select((selectUserById(this.route.snapshot.params['id'])))

}
