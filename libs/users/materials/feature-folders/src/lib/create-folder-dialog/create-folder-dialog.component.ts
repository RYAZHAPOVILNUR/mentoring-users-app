import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateFolderButtonComponent } from '@users/materials/ui';

@Component({
  selector: 'materials-create-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss'],
})
export class CreateFolderDialogComponent {
  public dialogRef = inject(MatDialogRef<CreateFolderButtonComponent>);

  folderTitle = new FormControl<string>('', [Validators.required]);

  public createNewFolder(): void {
    if (this.folderTitle.value) {
      this.dialogRef.close(this.folderTitle.value.trim());
    }
  }
}
