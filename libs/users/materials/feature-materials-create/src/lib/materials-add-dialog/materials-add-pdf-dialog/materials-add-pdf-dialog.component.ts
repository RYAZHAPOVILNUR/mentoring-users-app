import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-materials-add-pdf-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './materials-add-pdf-dialog.component.html',
  styleUrls: ['./materials-add-pdf-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddPdfDialogComponent {
  public formGroup: FormGroup
  private formBuilder = inject(FormBuilder)
  public dialogRef = inject(MatDialogRef<MaterialsAddPdfDialogComponent>)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, materialLink: string}) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), this.noWhitespaceValidator()]],
      materialLink: ['', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator(), this.pdfValidator()]]
    });
  }

  cancel() {
    this.dialogRef.close()
  }

  save() {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        materialLink: this.formGroup.value.materialLink
      }
      this.dialogRef.close(formData)
    }
  }

  private noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.trim().length === 0 ? { whitespace: true } : null;
    };
  }

  private pdfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.toLowerCase().endsWith('.pdf') ? null : { invalidPdf: true };
    };
  }

}
