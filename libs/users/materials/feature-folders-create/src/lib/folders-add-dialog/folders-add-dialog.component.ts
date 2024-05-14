import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  public myForm: FormGroup;
  private formBuilder = inject(FormBuilder)
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.myForm.valid) {
      this.dialogRef.close(this.myForm.value.title)
    }
  }
}
