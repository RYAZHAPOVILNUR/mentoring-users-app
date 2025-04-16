import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FoldersEntity, FoldersFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-delete-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-folder-dialog.component.html',
  styleUrls: ['./delete-folder-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFolderDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly folderFacade = inject(FoldersFacade);

  onDelete(folder: FoldersEntity) {
    this.dialogRef.close();
    this.folderFacade.deleteFolder(folder.id);
  }
}
