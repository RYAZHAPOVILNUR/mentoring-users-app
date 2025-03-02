import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>)
  data = inject(MAT_DIALOG_DATA)
  form!: FormGroup

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      material_link: new FormControl('', [Validators.required, this.formatValidator])
    })
  }

  formatValidator = ({ value }: AbstractControl): ValidationErrors | null => {
    if (!value.endsWith(this.data.type)) {
      return { pdfExtension: 'The file must have a .pdf extension' };
    }
    return null
  };

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }

  close() {
    this.dialogRef.close()
  }
}
