import { inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthFacade } from "@auth/data-access";
import { UsersEntity } from "@users/core/data-access";
import { of, tap } from "rxjs";
import { UsersFacade } from '@users/users/data-access';

export class UserProfileContainerComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly authFacade = inject(AuthFacade);

  public readonly isLoggedUser = of(false);

  public readonly user = toSignal(
    this.usersFacade.openedUser$.pipe(
      tap(() => this.usersFacade.loadUser())
    ),
    { initialValue: null as UsersEntity | null }
  );

  public readonly status = this.authFacade.status$;
}
