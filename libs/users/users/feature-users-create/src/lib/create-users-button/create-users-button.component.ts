import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CreateUserDTO } from '@users/core/data-access';
import { UsersFacade } from '@users/users/data-access';

import { CreateUsersDialogComponent } from '../create-users-dialog/create-users-dialog.component';

@Component({
  selector: 'users-create-users-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-users-button.component.html',
  styleUrls: ['./create-users-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);
  private name!: string;

  private email!: string;
  public dialog = inject(MatDialog);

  openAddUserDialog(): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> = this.dialog.open(CreateUsersDialogComponent, {
      data: { name: this.name, email: this.email },
    });
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
