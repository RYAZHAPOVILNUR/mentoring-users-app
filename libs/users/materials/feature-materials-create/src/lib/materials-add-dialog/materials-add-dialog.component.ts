import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  public form = new FormBuilder().group({
    title: ['', Validators.required],
    url: ['', [Validators.required, this.urlValidator.bind(this)]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {}

  urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return { invalidUrl: true };

    switch (this.data.type) {
      case 'pdf':
        return this.pdfUrlValidator(control);
      case 'audio':
        return this.audioUrlValidator(control);
      case 'video':
        return this.videoUrlValidator(control);
      default:
        return { invalidUrl: true };
    }
  }

  pdfUrlValidator(control: AbstractControl): ValidationErrors | null {
    return control.value.endsWith('.pdf') ? null : { invalidUrl: true };
  }

  audioUrlValidator(control: AbstractControl): ValidationErrors | null {
    return control.value.endsWith('.mp3') ? null : { invalidUrl: true };
  }

  videoUrlValidator(control: AbstractControl): ValidationErrors | null {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[^&\s]+|youtu\.be\/[^&\s]+)/;
    return youtubeRegex.test(control.value) ? null : { invalidUrl: true };
  }

  cancel() {
    this.dialogRef.close();
  }

  saveMaterial() {
    if (this.form.valid) {
      const formData = {
        title: this.form.value.title,
        url: this.form.value.url,
      };
      this.dialogRef.close(formData);
    }
  }
}
