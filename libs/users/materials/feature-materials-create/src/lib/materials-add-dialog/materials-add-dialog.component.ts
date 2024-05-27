import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddMaterial, CreateMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent {
  public readonly dialogRef = inject(MatDialogRef);
  private readonly formBuilder = inject(FormBuilder);
  public readonly myFormGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', Validators.required],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: AddMaterial) { }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const material: Partial<CreateMaterial> = {
      title: this.myFormGroup.value.title,
      material_link: this.myFormGroup.value.link,
    }
    this.dialogRef.close(material);
  }
}
