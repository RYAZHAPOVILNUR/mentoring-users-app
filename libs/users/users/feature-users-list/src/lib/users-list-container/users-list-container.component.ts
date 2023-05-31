import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersVM } from '../users-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsersUserDeleteDialogComponent } from '../users-user-delete-dialog/users-user-delete-dialog.component';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [CommonModule, UsersListComponent, MatButtonModule, MatDialogModule],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore]
})
export class UsersListContainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;
  public dialog = inject(MatDialog);
  public usersFacade = inject(UsersFacade);

  onDeleteUser(user: UsersVM) {
    const dialogRef: MatDialogRef<UsersUserDeleteDialogComponent> = this.dialog.open(UsersUserDeleteDialogComponent,{
      data: {name: user.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.usersFacade.deleteUser(user.id)
      } else {
        // Обработка события "Нет"
      }
    });
  }


}
