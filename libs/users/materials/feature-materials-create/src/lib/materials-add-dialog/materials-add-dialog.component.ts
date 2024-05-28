import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public dialogForm: FormGroup;
  private dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  public materialType: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {
    this.materialType = data.type;

    this.dialogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      material_link: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.dialogForm.valid) {
      this.dialogRef.close(this.dialogForm.value);
    } else {
      this.dialogForm.markAllAsTouched();
    }
  }
}
