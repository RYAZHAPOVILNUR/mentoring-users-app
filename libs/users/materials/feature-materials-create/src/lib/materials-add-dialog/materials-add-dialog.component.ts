import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsAddDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef);
  public data: { name: string } = inject(MAT_DIALOG_DATA);
  public materialsFacade = inject(MaterialsFacade);

  public readonly materialsFormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    type: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10)
    ]],
    materialLink: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]]
  });

  public onSave(): void {
    if (this.materialsFormGroup.valid) {
      const formValue = this.materialsFormGroup.value;
      const materialData: CreateMaterialDTO = {
        title: formValue.title ?? '',
        type: (formValue.type as 'video' | 'pdf' | 'podcast') ?? 'video',
        material_link: formValue.materialLink ?? ''
      };
      this.materialsFacade.addMaterial(materialData);
      this.dialogRef.close(materialData);
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
