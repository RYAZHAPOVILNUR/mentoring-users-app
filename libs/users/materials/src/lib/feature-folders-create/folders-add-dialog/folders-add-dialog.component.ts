import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { nameFolder: string }) {
    this.formGroup = this.formBuilder.group({
      nameFolder: ['', Validators.required],
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formGroup.valid) {
      const newFolder = {
        nameFolder: this.formGroup.value.nameFolder,
      };
      this.dialogRef.close(newFolder);
    }
  }
}
