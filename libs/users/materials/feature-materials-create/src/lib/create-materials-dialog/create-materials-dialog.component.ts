import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateMaterialsDialogComponent>);
  private data: { name: string; email: string } = inject(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);

  public formGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.value.name,
      };
      this.dialogRef.close(formData);
    }
  }
}
