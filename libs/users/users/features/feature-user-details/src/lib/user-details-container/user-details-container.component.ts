import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';

import { CoreUiConfirmDialogComponent } from '@core/ui-core';
import { selectQueryParam } from '@shared/util-store';
import { Callback } from '@shared/util-typescript';
import { UserEntity } from '@users/core/data-access-models';
import { CreateUserDTO, UsersFacade } from '@users/users/data-access-user';

import { UserDetailsCardComponent } from '../user-details-card/user-details-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, UserDetailsCardComponent, MatDialogModule, LetDirective],
  templateUrl: './user-details-container.component.html',
  styleUrls: ['./user-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
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
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {
        dialogText: `Вы уверены, что хотите удалить ${this.user.name}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.usersFacade.deleteUser(this.user.id);
          this.router.navigate(['/home']);
        }
      });
  }
}
