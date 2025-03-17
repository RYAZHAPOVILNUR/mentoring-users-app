import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddFolderDTO, FoldersEntity, FoldersFacade } from '@users/materials/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-edit-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFolderDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly folderFacade = inject(FoldersFacade);

  public readonly title = new FormControl(this.data.title);

  onEdit() {
    this.dialogRef.close();
    this.folderFacade.editFolder({ title: this.title.value, createdAt: this.data.createdAt, id: this.data.id });
  }
}
