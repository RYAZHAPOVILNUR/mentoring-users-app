import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateFolderButtonComponent } from '../create-folder-button/create-folder-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
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
