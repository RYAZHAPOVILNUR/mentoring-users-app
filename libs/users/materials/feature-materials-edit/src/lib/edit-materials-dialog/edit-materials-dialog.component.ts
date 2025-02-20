import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialsDTO } from '@users/core/data-access';

@Component({
  selector: 'users-edit-materials-dialog',
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
  templateUrl: './edit-materials-dialog.component.html',
  styleUrls: ['./edit-materials-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMaterialsDialogComponent {
  private formBuilder = inject(FormBuilder);

  public dialogRef = inject(MatDialogRef<EditMaterialsDialogComponent>);
  public data: { dialogText: string; materialData: MaterialsDTO } = inject(MAT_DIALOG_DATA);

  public dialogText: string = this.data.dialogText;

  public formGroup: FormGroup = this.formBuilder.group({
    title: [this.data.materialData.title, Validators.required],
    id: [this.data.materialData.id, Validators.required],
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.dialogRef.close(formData);
    }
  }
}
