import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FoldersEntity, FoldersFacade } from '@users/materials/data-access';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-edit-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFolderDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly folderFacade = inject(FoldersFacade);
  public readonly folderName = new FormControl('');

  onEdit(folder: FoldersEntity) {
    this.dialogRef.close();
    // this.folderFacade.deleteFolder(folder.id);
    console.log('Edit dialog:', folder);
  }
}
