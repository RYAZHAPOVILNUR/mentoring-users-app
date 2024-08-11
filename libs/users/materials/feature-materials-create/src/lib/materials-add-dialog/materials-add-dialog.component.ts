import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsAddButtonComponent } from '../materials-add-button/materials-add-button.component';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public formGroup: FormGroup;
  private readonly fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MaterialsAddButtonComponent, { buttonText: string, title: string, url: string }>)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { buttonText: string, title: string, url: string }) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
    })
  }

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
    };
  }
}
