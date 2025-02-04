import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialType } from '@users/materials/data-access';

interface DialogData {
  type: MaterialType;
}

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss']
})
export class AddMaterialDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AddMaterialDialogComponent>);
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly materialForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    material_link: ['', [Validators.required]],
    type: [this.data.type]
  });

  getPlaceholder(): string {
    switch (this.data.type) {
      case MaterialType.VIDEO:
        return 'Вставьте ссылку на YouTube видео';
      case MaterialType.PDF:
        return 'Вставьте ссылку на PDF файл';
      case MaterialType.PODCAST:
        return 'Вставьте ссылку на аудио файл';
      default:
        return 'Вставьте ссылку';
    }
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      this.dialogRef.close({
        ...this.materialForm.value,
        created_at: new Date().toISOString()
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 