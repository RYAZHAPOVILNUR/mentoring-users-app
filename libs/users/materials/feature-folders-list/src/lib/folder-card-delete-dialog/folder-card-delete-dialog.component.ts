import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-folder-card-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folder-card-delete-dialog.component.html',
  styleUrls: ['./folder-card-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderCardDeleteDialogComponent {
  private readonly foldersFacade = inject(MaterialsFacade)

  constructor(public dialogRef: MatDialogRef<FolderCardDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { folder: Folder }) {}

  onDelete(folderId: number) {
    this.foldersFacade.deleteFolder(folderId);
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close()
  }
}
