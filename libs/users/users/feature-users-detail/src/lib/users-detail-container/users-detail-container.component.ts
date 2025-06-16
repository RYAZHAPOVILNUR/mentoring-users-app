import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DetailUsersCardComponent } from '../users-detail-card/detail-users-card.component';
import { UsersErrors, UsersFacade, onSuccessEditionCbType } from '@users/users/data-access';
import { Observable, map, tap, startWith } from 'rxjs';
import { selectQueryParam, UsersEntity } from '@users/core/data-access';
import { Store, select } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditUserData, QueryParamsConfig } from '../users-detail-card/detail-users-card-vm';

@Component({
  selector: 'users-detail',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent, MatDialogModule, LetDirective],
  templateUrl: './users-detail-container.component.html',
  styleUrls: ['./users-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  protected user!: UsersEntity;
  protected readonly status$ = this.usersFacade.status$;
  protected readonly errors$: Observable<UsersErrors | null> = this.usersFacade.errors$;

  protected readonly user$: Observable<UsersEntity | null> = this.usersFacade.openedUser$.pipe(
    tap((user) => {
      if (!user) {
        this.usersFacade.loadUser();
      } else {
        this.user = user;
      }
    }),
  );

  protected readonly isEditUser$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('isEditUser')),
    map((params) => params === 'true'),
  );

  protected readonly isEditPoint$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('isEditPoint')),
    map((params) => params === 'true'),
  );

  protected onEditUser(userData: EditUserData, onSuccessCb: onSuccessEditionCbType) {
    this.usersFacade.editUser({
      ...this.user, ...userData,
      purchaseDate: new Date().toString(),
      educationStatus: 'trainee',},
      this.user.id, onSuccessCb
    );
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { isEditUser: false },
    });
  }

  protected onCloseUser() {
    this.router.navigate(['/admin/users']);
  }

  protected onCloseEditMode() {
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { isEditUser: false, isEditPoints: false },
    });
  }

  protected onOpenEditMode(params: QueryParamsConfig) {
    this.router.navigate(['admin/users', this.user.id], {
      queryParams: params,
    });
  }

  protected onDeleteUser() {
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
