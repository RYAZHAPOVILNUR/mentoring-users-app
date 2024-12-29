import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileType } from 'libs/users/materials/data-access/src/lib/constants-enums/materials-enums';
import { materialsValidation } from 'libs/users/materials/data-access/src/lib/constants-enums/materials-validation';
import { material_linkValidator } from 'libs/users/materials/data-access/src/lib/validators/materials-links-validator';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  public readonly MaterialFileType = MaterialFileType;
  public readonly materialsValidation = materialsValidation;
 
  public addMaterial = this.fb.group({
    title: ['', Validators.required],
    link: ['', [Validators.required, material_linkValidator(this.data)]],
  });

  public saveMaterial() {
    if (this.addMaterial.valid) {
      this.dialogRef.close(this.addMaterial.value);
    }
  }
}