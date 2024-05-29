import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUsersDialogComponent } from '../create-users-dialog/create-users-dialog.component';
import { UsersFacade } from '@users/users/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateUserDTO } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-users-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-users-button.component.html',
  styleUrls: ['./create-users-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  public openAddUserDialog(): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> = this.dialog.open(CreateUsersDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newUserData: CreateUserDTO = {
            name: result.name,
            email: result.email,
            purchaseDate: new Date().toString(),
            educationStatus: 'trainee',
          };

          this.usersFacade.addUser(newUserData);
        }
      });
  }
}
