import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LinkValidationPipe } from './pipes/LinkValidationPipe.pipe';

@Component({
  selector: 'users-material-add-dialog',
  standalone: true,
  imports: [
    CommonModule,     
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    LinkValidationPipe,
  ],
  templateUrl: './material-add-dialog.component.html',
  styleUrls: ['./material-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { materialType: string },) {
    this.formGroup = this.formBuilder.group({
      materialTitle: ['', Validators.required],
      materialLink: ['', Validators.required]
    })
  }

  public close(): void {
    this.dialogRef.close()
  }

  public save(): void {
    if (this.formGroup.valid) {
      const newMaterial = {
        materialTitle: this.formGroup.value.materialTitle,
        materialLink: this.formGroup.value.materialLink
      }

      this.dialogRef.close(newMaterial)
    }
  }
}
