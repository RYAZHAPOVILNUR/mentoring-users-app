import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-core-ui-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './core-ui-confirm-dialog.component.html',
  styleUrls: ['./core-ui-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreUiConfirmDialogComponent {
  public data: { dialogText: string } = inject(MAT_DIALOG_DATA);
  public dialogText: string = this.data.dialogText;

  // private dialogRef = inject(MatDialogRef<CoreUiConfirmDialogComponent, boolean>)
  constructor(private dialogRef: MatDialogRef<CoreUiConfirmDialogComponent, boolean>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
