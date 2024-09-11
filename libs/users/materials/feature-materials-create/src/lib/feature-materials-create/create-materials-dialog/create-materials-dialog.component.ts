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

function urlValidator(fileType: MaterialFileType): ValidatorFn {
  console.log(fileType);
  return (control: AbstractControl) => {
    const URL = control.value as string;

    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const YTpattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

    const isValid = pattern.test(URL);

    if (isValid) {
      console.log(URL, fileType, URL.endsWith(fileType));
      if (URL.endsWith(fileType)) {
        return null; // Pdf and mp3 validation passed
      } else if (fileType === 'видео' && YTpattern.test(URL)) {
        return null; // YT validation passed
      }
      return { urlValidator: true }; // Validation fails
    } else {
      return { urlValidator: true }; // Validation fails
    }
  };
}

