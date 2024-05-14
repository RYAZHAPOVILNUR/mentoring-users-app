import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CreateMaterial } from '@users/materials/data-access';
import { DeepReadonly } from '@users/core/utils';

export type AddMaterial = DeepReadonly<{
  title: string;
  material_link: string;
  type: string
}>
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
  public myFormGroup: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  public readonly dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddMaterial) {
    this.myFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.myFormGroup.valid) {
      const data: Partial<CreateMaterial> = {
        title: this.myFormGroup.value.title,
        material_link: this.myFormGroup.value.link,
      }
      this.dialogRef.close(data);
    }
  }
}
