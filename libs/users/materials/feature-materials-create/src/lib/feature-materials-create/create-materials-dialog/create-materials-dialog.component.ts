import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFileType } from '@users/core/data-access';

@Component({
  selector: 'users-create-folders-dialog',
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
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CreateMaterialsDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<CreateMaterialsDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MaterialFileType) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', [Validators.required, urlValidator(this.data)]],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        link: this.formGroup.value.link,
      };
      this.dialogRef.close(formData);
    }
  }
}

function urlValidator(data: MaterialFileType): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any; } | null => {
    const value = control.value as string;


    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const isValid = pattern.test(value);

    if (isValid) {
      return null; // Validation passes
    } else {
      return { urlValidator: true }; // Validation fails
    }
  };
}

const URL_REGEXP = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
