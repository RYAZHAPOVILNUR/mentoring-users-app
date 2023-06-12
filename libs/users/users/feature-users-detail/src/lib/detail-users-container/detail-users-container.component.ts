import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateUserDTO, UsersEntity, UsersFacade} from "@users/users/data-access";
import {UsersListComponent} from "@users/feature-users-list";
import {UsersDetailComponent} from "@users/feature-users-detail";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'users-detail-users-container',
  standalone: true,
  imports: [CommonModule, UsersListComponent, UsersDetailComponent],
  templateUrl: './detail-users-container.component.html',
  styleUrls: ['./detail-users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailUsersContainerComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly router = inject(Router);
  private userId!: number;
  public readonly loadingStatus$ = this.usersFacade.status$;
  public readonly error$ = this.usersFacade.errors$
  public readonly currentUser$: Observable<UsersEntity | null> = this.usersFacade.openedUser$.pipe(
    tap((user: UsersEntity | null): void => {
        if(!user) {
          this.usersFacade.loadUser()
        } else {
          this.userId = user.id
        }
      }
    )
  )

  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.userId);
    this.router.navigate(['/home'])
  }
}
