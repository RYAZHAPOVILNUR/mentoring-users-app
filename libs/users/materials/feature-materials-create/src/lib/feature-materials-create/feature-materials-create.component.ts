import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TMaterialCreate } from '@users/materials/data-access';
import { TMaterialButton } from '../materials-create-button/materials-buttons.interface';

@Component({
  selector: 'users-feature-materials-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './feature-materials-create.component.html',
  styleUrls: ['./feature-materials-create.component.css'],
})
export class FeatureMaterialsCreateComponent {
  private readonly dialogRef = inject(MatDialogRef<FeatureMaterialsCreateComponent>);
  private readonly data: { materialTitle: string, validation: string } = inject(MAT_DIALOG_DATA);

  public readonly materialTitle: TMaterialButton['title'] = this.data.materialTitle.toLocaleLowerCase();
  public readonly materialFormGroup = new FormGroup({
    title: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.maxLength(18)] }),
    material_link: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.pattern(this.data.validation)] }),
  });

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public save(): void {
    const formData: TMaterialCreate = {
      title: this.materialFormGroup.getRawValue().title.trim(),
      material_link: this.materialFormGroup.getRawValue().material_link.trim(),
    }
    this.dialogRef.close(formData)
  }
}
