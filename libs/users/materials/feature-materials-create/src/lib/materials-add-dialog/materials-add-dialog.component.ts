import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  public formGroup = this.formBuilder.group({
    title: ['', Validators.required],
    material_link: ['', Validators.required]
  });

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        material_link: this.formGroup.value.material_link
      };
      this.dialogRef.close(formData);
    }
  }
}
