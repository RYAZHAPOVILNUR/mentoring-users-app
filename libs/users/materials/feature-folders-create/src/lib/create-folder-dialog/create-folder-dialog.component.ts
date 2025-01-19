import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-create-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss'],
})
export class CreateFolderDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<CreateFolderDialogComponent>);
  public readonly folderTitle = new FormControl('', [Validators.required, Validators.minLength(1)]);

  closeDialog() {
    if (this.folderTitle.valid) {
      const folderTitle: string | null = this.folderTitle.value;
      this.dialogRef.close(folderTitle);
    }
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
