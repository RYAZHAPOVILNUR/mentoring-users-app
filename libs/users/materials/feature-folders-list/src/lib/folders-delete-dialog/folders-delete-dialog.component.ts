import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'users-folders-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './folders-delete-dialog.component.html',
  styleUrls: ['./folders-delete-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersDeleteDialogComponent {
  dialogRef = inject(MatDialogRef<FoldersDeleteDialogComponent>)
  data = inject(MAT_DIALOG_DATA)

  del() {
    this.dialogRef.close(true)
  }
}
