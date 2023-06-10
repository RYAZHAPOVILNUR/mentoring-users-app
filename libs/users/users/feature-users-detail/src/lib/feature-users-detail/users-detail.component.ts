import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DetailUsersCardComponent } from '../detail-users-card/detail-users-card.component';
import { CreateUserDTO, UsersEntity, UsersFacade } from "@users/users/data-access";
import { Observable, tap } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-users-detail',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent],
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly router = inject(Router);
  public readonly userId!: number;

  public readonly currentUser$: Observable<UsersEntity | null > = this.usersFacade.openedUser$.pipe(
    tap(
      user => {
        if(!user) {
          this.usersFacade.loadUser()
        }
      }
    )
  );
  public readonly loadingStatus$ = this.usersFacade.status$;

  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.userId);
    this.router.navigate(['/home'])
  }

}
