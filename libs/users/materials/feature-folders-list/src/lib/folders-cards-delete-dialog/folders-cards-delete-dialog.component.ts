import { ChangeDetectionStrategy, Component, inject, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FolderInterface, FoldersFacade } from '@users/materials/data-access';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-cards-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folders-cards-delete-dialog.component.html',
  styleUrls: ['./folders-cards-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardsDeleteDialogComponent {
  private readonly foldersFacade = inject(FoldersFacade)

  constructor(public dialogRef: MatDialogRef<FoldersCardsDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { folder: FolderInterface }) {}

  onDelete(folderId: number) {
    this.foldersFacade.deleteFolder(folderId);
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close()
  }
}
