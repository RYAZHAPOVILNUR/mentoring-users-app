import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'users-users-user-delete-dialog',
    standalone: true,
    templateUrl: './users-user-delete-dialog.component.html',
    styleUrls: ['./users-user-delete-dialog.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class UsersUserDeleteDialogComponent {
  public data:{name:string} = inject(MAT_DIALOG_DATA);
}
