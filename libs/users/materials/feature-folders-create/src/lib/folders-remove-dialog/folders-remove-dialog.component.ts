import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './folders-remove-dialog.component.html',
  styleUrls: ['./folders-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersRemoveDialogComponent {
  public dialogRef: MatDialogRef<FoldersRemoveDialogComponent> = inject(MatDialogRef<FoldersRemoveDialogComponent>);
  public dialogData: { folderId: number, folderTitle: string } = inject(MAT_DIALOG_DATA);

  public removeFolder(result: boolean): void {
    if (result) this.dialogRef.close({ delete: true });
    else this.dialogRef.close({ delete: false });
  }
}
