import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private dialogRef: MatDialogRef<MaterialsAddDialogComponent>
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      material_link: ['', Validators.required],
    });
  }
  
  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        material_link: this.formGroup.value.material_link,
      };
      this.dialogRef.close(formData);
    }
  }
}
