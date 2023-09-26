// import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
// import {CommonModule} from "@angular/common";
// import {ProfileFormUiComponent} from "../profile-form-ui/profile-form-ui.component";
// import {LetDirective} from "@ngrx/component";
// import {UsersFacade} from "@users/users/data-access";
// import {AuthFacade} from "@auth/data-access";
// import {Observable, of, tap} from "rxjs";
// import {UsersEntity} from "@users/core/data-access";
//
// @Component({
//   selector: 'users-profile-container',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ProfileFormUiComponent,
//     LetDirective
//   ],
//   templateUrl: './user-profile-container.component.html',
//   styleUrls: ['./user-profile-container.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
//
// export class UserProfileContainerComponent {
//
//   private readonly usersFacade = inject(UsersFacade);
//   private readonly authFacade = inject(AuthFacade);
//
//   public readonly isLoggedUser = of(false);
//
//   public readonly status$ = this.authFacade.status$;
//   public readonly user$: Observable<UsersEntity | any> = this.usersFacade.openedUser$
//     .pipe(
//       tap(_ => this.usersFacade.loadUser())
//     );
//
// }
