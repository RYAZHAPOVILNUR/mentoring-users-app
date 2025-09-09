import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from '@shared/util-store';
import { Callback } from '@shared/util-typescript';
import { UserEntity } from '@users/shared/data-access-models';
import { CreateUserDTO, UsersFacade, onSuccessSPonCbType } from '@users/users/data-access-user';
import { UserDialogService } from '@users/users/feature-user-dialog';
import { filter, map, Observable, tap } from 'rxjs';

import { UserDetailsCardComponent } from '../user-details-card/user-details-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, UserDetailsCardComponent, MatDialogModule, LetDirective],
  templateUrl: './user-details-container.component.html',
  styleUrls: ['./user-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly userDialogService = inject(UserDialogService);
  private readonly usersFacade = inject(UsersFacade);
  public user!: UserEntity;

  public readonly user$: Observable<UserEntity | null> = this.usersFacade.openedUser$.pipe(
    tap((user) => {
      if (!user) {
        this.usersFacade.loadUser();
      } else {
        this.user = user;
      }
    }),
  );
  public readonly status$ = this.usersFacade.status$;
  public readonly editMode$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('edit')),
    map((params) => params === 'true'),
  );
  public readonly errors$ = this.usersFacade.errors$;

  public onEditUser(userData: CreateUserDTO, onSuccessCb: Callback) {
    this.usersFacade.editUser(userData, this.user.id, onSuccessCb);
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { edit: false },
    });
  }

  onCloseUser() {
    this.router.navigate(['/admin/users']);
  }

  onAddStoryPoints(userData: CreateUserDTO, onSuccessAddSP: onSuccessSPonCbType) {
    this.usersFacade.addStoryPoints(userData, this.user.id, onSuccessAddSP);
  }

  onCloseEditMode() {
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { edit: false },
    });
  }

  onOpenEditMode() {
    this.router.navigate(['admin/users', this.user.id], {
      queryParams: { edit: true },
    });
  }

  onDeleteUser() {
    const dialogRef = this.userDialogService.openDeleteUserConfirmDialog(this.user);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => {
          this.usersFacade.deleteUser(this.user.id);
          this.router.navigate(['/home']);
        }),
      )
      .subscribe();
  }
}
