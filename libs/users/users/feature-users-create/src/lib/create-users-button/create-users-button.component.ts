import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUsersDialogComponent } from '../create-users-dialog/create-users-dialog.component';
import { UsersEntity, UsersFacade } from '@users/users/data-access';

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
        const newUserData: UsersEntity = {
          id: 0,
          name: result.name,
          email: result.email,
          username: result.name,
          address: {
            city: "Gwenborough",
            street: "Kulas Light",
            suite: "Apt. 556",
            zipcode: "92998-3874",
          },
          phone: '1-999-1',
          website: 'google.com',
          company: {
            bs: "harness real-time e-markets",
            catchPhrase: "Multi-layered client-server neural-net",
            name: "Romaguera-Crona"
          }
        };
        this.usersFacade.addUser(newUserData);
      }
    });
  }
}
