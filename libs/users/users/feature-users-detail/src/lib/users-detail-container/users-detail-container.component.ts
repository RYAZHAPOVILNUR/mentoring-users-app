import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DetailUsersCardComponent } from '../users-detail-card/detail-users-card.component';
import { UsersErrors, UsersFacade, onSuccessEditionCbType } from '@users/users/data-access';
import { Observable, map, tap } from 'rxjs';
import { selectQueryParam, CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { Store, select } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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
  public user!: UsersEntity;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly user$: Observable<UsersEntity | null> = this.usersFacade.openedUser$.pipe(
    tap((user) => {
      if (!user) {
        this.usersFacade.loadUser();
      } else {
        this.user = user;
      }
    })
  );
  public readonly status$ = this.usersFacade.status$;
  public readonly editMode$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('edit')),
    map((params) => params === 'true')
  );
  public readonly errors$: Observable<UsersErrors | null> = this.usersFacade.errors$;

  public onEditUser(userData: CreateUserDTO, onSuccessCb: onSuccessEditionCbType) {
    this.usersFacade.editUser(userData, this.user.id, onSuccessCb);
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { edit: false },
    });
  }

  onAddStoryPoints(userData: CreateUserDTO, onSuccessCb: onSuccessEditionCbType) {
    this.usersFacade.addUserStoryPoints(userData, this.user.id, onSuccessCb);
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
