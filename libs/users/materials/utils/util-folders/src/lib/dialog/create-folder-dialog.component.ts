import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInput } from '@angular/material/input';

import { CreateFolder } from '@users/ui-folders';

@Component({
  selector: 'users-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss'],
  imports: [MatDialogModule, MatInput, ReactiveFormsModule, MatButton, MatFormField],
})
export class CreateFolderDialogComponent {
  private readonly dialogRef: MatDialogRef<CreateFolderDialogComponent, CreateFolder> = inject(
    MatDialogRef<CreateFolderDialogComponent, CreateFolder>,
  );
  private readonly fb = inject(FormBuilder);

  readonly newFolderForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  onCloseButtonClick(): void {
    return this.dialogRef.close(this.newFolderForm.getRawValue());
  }
}
