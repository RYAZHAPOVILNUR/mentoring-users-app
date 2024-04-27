import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folder-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './folder-create-dialog.component.html',
  styleUrls: ['./folder-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<FolderCreateDialogComponent>);
  public readonly folderNameField = new FormControl({ value: '', disabled: false });

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.folderNameField.value);
  }
}
