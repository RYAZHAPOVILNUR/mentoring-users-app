import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileType, materialsValidation, material_linkValidator } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  public readonly MaterialFileType = MaterialFileType;
  public readonly materialsValidation = materialsValidation;

  public addMaterial: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required, material_linkValidator(this.data)]),
  });

  public saveMaterial() {
    if (this.addMaterial.valid) {
      this.dialogRef.close(this.addMaterial.value);
    }
  }
}
