import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUsersDialogComponent } from '../create-users-dialog/create-users-dialog.component';
import { UsersFacade, CreateUserDTO } from '@users/users/data-access';

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
  private name!: string;
  private email!: string;
  public dialog = inject(MatDialog);
  private readonly usersFacade = inject(UsersFacade);

  openAddUserDialog(): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> = this.dialog.open(CreateUsersDialogComponent, {
      data: { name: this.name, email: this.email },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUserData: CreateUserDTO = {
          name: result.name,
          email: result.email,
        };
        this.usersFacade.addUser(newUserData);
      }
    });
  }
}
