import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterialsButtonComponent } from '../create-materials-button/create-materials-button.component';

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMaterialsDialogComponent {
  private readonly fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateMaterialsButtonComponent, { buttonText: string, title: string, url: string }>);
  public data: { buttonText: string, title: string, url: string } = inject(MAT_DIALOG_DATA);

  public formGroup = this.fb.group({
    title: ['', Validators.required],
    url: ['', Validators.required],
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        url: this.formGroup.value.url,
      }
      this.dialogRef.close(formData)
    }
  }
}
