import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {CreateUsersDialogComponent} from "../create-users-dialog/create-users-dialog.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-users-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './create-users-button.component.html',
  styleUrls: ['./create-users-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {
  private readonly dialog: MatDialog = inject(MatDialog);

  public open() {
    this.dialog.open(CreateUsersDialogComponent, {
      height: "50vh", width: "50vw"
    })
  }
}
